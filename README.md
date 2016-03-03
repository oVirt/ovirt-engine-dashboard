# oVirt Dashboard UI plugin

[oVirt](http://www.ovirt.org/) [UI plugin](http://www.ovirt.org/develop/release-management/features/ux/uiplugins/) that gives overview of the environment and its specific objects.

## Prerequisites

Install [Node.js](https://nodejs.org/) v4 (LTS). [nvm](https://github.com/creationix/nvm) can be used to manage multiple Node.js versions.

Use `node -v` to check the current Node.js version.

## Project setup

Run `npm i` to install dependencies. This might take a while.

Use `npm t` to lint code and run tests.

Use `npm run dev` to build for development and watch & recompile files on change.

Use `npm run build` to build for production.

## oVirt setup

1. Clone `ovirt-engine` and setup its [development environment](https://gerrit.ovirt.org/gitweb?p=ovirt-engine.git;a=blob_plain;f=README.adoc;hb=master)
2. Apply [Alexander's patch](https://gerrit.ovirt.org/#/c/54058/) that adds `DashboardDataServlet`
3. Build Engine from source via `make install-dev`
4. Run `engine-setup` to configure the product
5. Symlink plugin files to `ui-plugins` directory as following:

```
cd ${PREFIX}/share/ovirt-engine/ui-plugins
ln -s /path/to/ovirt-dashboard-ui-plugin/dist/dashboard.json dashboard.json
ln -s /path/to/ovirt-dashboard-ui-plugin/dist/dashboard-resources dashboard-resources
```

## Access plugin via oVirt UI

Open WebAdmin in your browser, you should land on **Dashboard** main tab:

```
https://engine:8443/ovirt-engine/webadmin/WebAdmin.html
```

Alternatively, access specific plugin resources via Engine, for example:

```
https://engine:8443/ovirt-engine/webadmin/plugin/dashboard/main_tab.html
```
