# Changelog

## 0.1.0 (2023-02-01)


### Features

* add .env file for container versions ([e180976](https://github.com/equinor/create-dm-app/commit/e1809765086c0cff0ffbbc9128c8f992d1ce0ad0))
* add example for job plugin and job usage ([dcdaea0](https://github.com/equinor/create-dm-app/commit/dcdaea0a4012ac4d1adead4333a62a9ed418ff2d))
* add new page "blueprint interaction" to query blueprints in demo app ([b71e687](https://github.com/equinor/create-dm-app/commit/b71e68744f3c40e6d7c506545f738102bd6a6d34))
* add progress tracking to example job handler ([1505a68](https://github.com/equinor/create-dm-app/commit/1505a682c8c41f1694e5d66738ee0b892b89b710))
* create entity of a selected blueprint ([c9c18ac](https://github.com/equinor/create-dm-app/commit/c9c18ace476a0821ae395edaa552348863388a7d))
* create recipe lookup for demo-app ([c1f28f0](https://github.com/equinor/create-dm-app/commit/c1f28f006218ac825167844e8de2c4196a866eb6))
* init create dm app ([4c6b82f](https://github.com/equinor/create-dm-app/commit/4c6b82f9a615092418e6fa0842f24296adfdceb2))
* rework overview to browse ([b9d538f](https://github.com/equinor/create-dm-app/commit/b9d538f0037c9dd96deffd7cdc8ec26df4879e2d))
* support for `dm entity import` (added _meta_) ([2d3373a](https://github.com/equinor/create-dm-app/commit/2d3373aeaec2d104e6262d5412e86f70f0dc64f6))


### Bug Fixes

* add menu icons ([4b75a92](https://github.com/equinor/create-dm-app/commit/4b75a924007bc46f08a975d1be39e9cc502641ee))
* bug with create new entity in BlueprintInteraction page ([460a07c](https://github.com/equinor/create-dm-app/commit/460a07c7c7a37e078f7636bfd142056045977144))
* correct home path ([56be854](https://github.com/equinor/create-dm-app/commit/56be8547a5816fe4dfac6641d57fadbdcfb2b3f1))
* disable eslint on build ([0e30987](https://github.com/equinor/create-dm-app/commit/0e309872113e1730ee4ba351b0ff0f1418154995)), closes [#61](https://github.com/equinor/create-dm-app/issues/61)
* remove unneeded files from copy ([9ab074b](https://github.com/equinor/create-dm-app/commit/9ab074bbc2cb3c04c673d9e9e8df2568d53289a9)), closes [#61](https://github.com/equinor/create-dm-app/issues/61)
* resolve bug from updating dm-core package ([9a5a9f6](https://github.com/equinor/create-dm-app/commit/9a5a9f64232659ca7b1b16642f3fd2c700a8b429)), closes [#61](https://github.com/equinor/create-dm-app/issues/61)
* sanitize repo name variable in cli.js ([048438d](https://github.com/equinor/create-dm-app/commit/048438d66b66337f9101cd79283374f4e256a6e2))
* update routing setup for demo-app ([d1d34a4](https://github.com/equinor/create-dm-app/commit/d1d34a4e1b9066816312c13c54d4d7030440d1a4))
* update styling of json views ([ab47b9b](https://github.com/equinor/create-dm-app/commit/ab47b9bf90fc1e9dec97d0313b1036f8bea32785))
* use new dm core (breaking FSTreeProvider change) ([#15](https://github.com/equinor/create-dm-app/issues/15)) ([134e09c](https://github.com/equinor/create-dm-app/commit/134e09cd668800f7b07592c037aa41369c51c27f))
* wrong path in plugin import ([a256cf0](https://github.com/equinor/create-dm-app/commit/a256cf042890ced97a7b573cd9eba5c155ea4db3))


### Code Refactoring

* formatting with prettier ([f8a8791](https://github.com/equinor/create-dm-app/commit/f8a879121d412337f27f20d4513385a44f2f5e54))
* move ci files to workflows folder ([d46e326](https://github.com/equinor/create-dm-app/commit/d46e326b0621e5655c49ec1613c9be432f402ddf))
* remove dmt from about ([492806b](https://github.com/equinor/create-dm-app/commit/492806b78c3bc854e6953b6af9cf6707c7c89e9e))
* remove portal ([a67901c](https://github.com/equinor/create-dm-app/commit/a67901cb15c25f1b1dbee707e9411840e8373aec))
* remove unused files and code ([c7b80cc](https://github.com/equinor/create-dm-app/commit/c7b80cc9e089f11a9742c1ffd471877afc4baa64))
* replace sys:// with dmss:// and fix formatting ([9cb8d82](https://github.com/equinor/create-dm-app/commit/9cb8d82cfb9faf790d1eba322c4002cf31760d19))
* reworked apps/ file structure ([2252c37](https://github.com/equinor/create-dm-app/commit/2252c373f10aadd003960478da475040546f9f7f))


### Documentation

* add more details on how to run app ([38580d4](https://github.com/equinor/create-dm-app/commit/38580d46d33564e62b68bafa8690775ad70563b5))
* add pre commit info to README.md ([70eac92](https://github.com/equinor/create-dm-app/commit/70eac9251e153f31ae37e38d655324ebedfa0cf5))
* fix typos in README ([5f22c85](https://github.com/equinor/create-dm-app/commit/5f22c85c9b02e60be478e7a005bf128a842f36d4))
* link core ([f462c69](https://github.com/equinor/create-dm-app/commit/f462c69168d254b918b762bf5add4e1a347c82aa))
* update readme to include quick overview and creating an app section ([cd337cf](https://github.com/equinor/create-dm-app/commit/cd337cf32adaee8636470d16049be3969dc5eb39))


### Miscellaneous Chores

* add eslint ([07e0c32](https://github.com/equinor/create-dm-app/commit/07e0c32cef9342fc146759a8f794ab2069e60e81))
* add github actions ([d410139](https://github.com/equinor/create-dm-app/commit/d410139c8310ab43a913a1abfec8d73008f2444f))
* add precommit ([c84fc94](https://github.com/equinor/create-dm-app/commit/c84fc94b80b1adea406065ceaca0c8f0f4ffa208))
* add pull request and issue templates ([a3385a8](https://github.com/equinor/create-dm-app/commit/a3385a8524ad1509811eb813fdddf306e4fee43c))
* add types to exported plugins ([886c325](https://github.com/equinor/create-dm-app/commit/886c325782889856c7783c4655a2192e6e4b0db4))
* bump dm-job version ([2b383c2](https://github.com/equinor/create-dm-app/commit/2b383c2ea5d51f9ef3571ae248adb28e0d0d2470))
* bump version ([ec80347](https://github.com/equinor/create-dm-app/commit/ec803477c1defadca570bc3938b55d446b6fac4d))
* fix github actions ([b0c899e](https://github.com/equinor/create-dm-app/commit/b0c899eaca968783e8ac84d6296bca24a0fc28cf))
* fix stable image versions ([64a5d5f](https://github.com/equinor/create-dm-app/commit/64a5d5f585ed1671eabdf78243b691509dfc75ca))
* update dm-core version and formatting ([2d28bbd](https://github.com/equinor/create-dm-app/commit/2d28bbd596d4daf7bba63f27e1cea226b99319ad))
* update dm-core version and formatting ([8cec906](https://github.com/equinor/create-dm-app/commit/8cec906531eb34d9c417feeae063442c3dcbea80))
* update NewEntityButtonProps and dm-core version ([e22df67](https://github.com/equinor/create-dm-app/commit/e22df670e12638c66868bc072cb2b5e7ac78d92e))
* update with new type syntax ([ce5c05f](https://github.com/equinor/create-dm-app/commit/ce5c05fcb7a0c95295f0fa11fb67fc152b664a71))


### Build System

* switch lock file from yarn to npm ([da57db5](https://github.com/equinor/create-dm-app/commit/da57db5b86e9de5c18356811c3431456a385f2d1)), closes [#61](https://github.com/equinor/create-dm-app/issues/61)
* update dm-core ([682bab5](https://github.com/equinor/create-dm-app/commit/682bab5f6a5920a3182f3595e998dbeda7ab5f79))


### Continuous Integration

* Add healthcheck badge to README ([be556d1](https://github.com/equinor/create-dm-app/commit/be556d1813943e3c0664abb54c1bb6c6fde5eda5)), closes [#38](https://github.com/equinor/create-dm-app/issues/38)
* Add healthcheck of latest packages ([b2de4a9](https://github.com/equinor/create-dm-app/commit/b2de4a9a91691d04c5627baee38648cb4171fea6)), closes [#38](https://github.com/equinor/create-dm-app/issues/38)
* Add nightly test ([6b6c54c](https://github.com/equinor/create-dm-app/commit/6b6c54c5036a3b2acefdea1902f7bf8191ba7bd0)), closes [#38](https://github.com/equinor/create-dm-app/issues/38)
* add release please workflow ([78ce78e](https://github.com/equinor/create-dm-app/commit/78ce78ef998b703ed2251a90c429211b2c91b472))
* Automate npm publishing using release-please ([9ef4aab](https://github.com/equinor/create-dm-app/commit/9ef4aab827a2665d256ccb1f3b988322f814b122)), closes [#63](https://github.com/equinor/create-dm-app/issues/63)
* Remove bug in publish-to-registry ([630d66a](https://github.com/equinor/create-dm-app/commit/630d66a14b30cfec3b11fc3d0fe6f274261ec680))
