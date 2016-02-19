# oVirt Dashboard UI plugin

[oVirt](http://www.ovirt.org/) [UI plugin](http://www.ovirt.org/Features/UIPlugins) that gives overview of the environment and its specific objects.

## Prerequisites

Install [Node.js](https://nodejs.org/) v4 (LTS). [nvm](https://github.com/creationix/nvm) can be used to manage multiple Node.js versions.

Use `node -v` to check the Node.js version.

## Plugin setup

Run `npm i` to install dependencies. This might take a while.

Use `npm t` to run tests and lint the code.

Use `npm run dev` to build plugin for development and watch & recompile files on change.

Use `npm run build` to build plugin for production.

## oVirt setup

Install latest [oVirt](http://www.ovirt.org/) Engine (nightly snapshot release):

```
dnf install http://resources.ovirt.org/pub/yum-repo/ovirt-release-master.rpm
dnf install ovirt-engine
engine-setup
```

Symlink plugin files to `ui-plugins` directory:

```
cd /usr/share/ovirt-engine/ui-plugins
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
