import os
from pathlib import Path
from time import sleep
from typing import Tuple

import requests

from services.job_handler_interface import Job, JobHandlerInterface, JobStatus
from utils.logging import logger

_SUPPORTED_TYPE = "dmss://WorkflowDS/Blueprints/ReverseDescription"


class JobHandler(JobHandlerInterface):
    """
    A silly test jobHandler that creates a NamedEntity of the input with it's description reversed
    """

    results_directory = f"{Path(__file__).parent}/results"
    os.makedirs(results_directory, exist_ok=True)

    def update_progress(self, progress: str):
        with open(self.progress_file, "w") as progress_file:
            progress_file.write(progress)

    def __init__(self, job: Job, data_source: str):
        super().__init__(job, data_source)
        self.headers = {"Access-Key": job.token}
        self.result_file = f"{self.results_directory}/{self.job.job_uid}"
        self.progress_file = f"{self.results_directory}/{self.job.job_uid}-progress"

    def _get_by_id(self, document_id: str, depth: int = 1, attribute: str = ""):
        params = {"depth": depth, "attribute": attribute}
        req = requests.get(
            f"{os.environ.get('DMSS_API', 'http://dmss:5000')}/api/v1/documents/{document_id}", params=params,
            headers=self.headers  # type: ignore
        )  # type: ignore
        req.raise_for_status()

        return req.json()

    def start(self) -> str:
        self.update_progress("1%")

        logger.info("Starting ReverseDescription job.")
        input_entity = self._get_by_id(f"{self.data_source}/{self.job.entity['applicationInput']['_id']}")
        result = input_entity.get("description", "Backup")[::-1]

        sleep(2)
        self.update_progress("10%")
        sleep(2)
        self.update_progress("26%")
        sleep(2)
        self.update_progress("58%")
        sleep(2)
        self.update_progress("89%")

        with open(f"{self.results_directory}/{self.job.job_uid}", "w") as result_file:
            result_file.write(result)
        logger.info("ReverseDescription job completed")
        self.update_progress("100%")
        return "OK"

    def result(self) -> Tuple[str, bytes]:
        result_file_path = Path(f"{self.results_directory}/{self.job.job_uid}")
        if not result_file_path.is_file():
            return "No result file found", b""

        with open(result_file_path, "rb") as result_file:
            return "Completed successfully", result_file.read()

    def progress(self) -> Tuple[JobStatus, str]:
        if os.path.isfile(self.progress_file):
            with open(self.progress_file, "r") as progress_file:
                progress = progress_file.read()
                status = JobStatus.COMPLETED if progress == "100%" else JobStatus.RUNNING
                return status, progress

        return JobStatus.NOT_STARTED, "The job has not started"
