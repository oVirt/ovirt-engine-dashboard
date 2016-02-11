# oVirt Dashboard UI plugin

[oVirt](http://www.ovirt.org/) [UI plugin](http://www.ovirt.org/Features/UIPlugins) that gives overview of the environment and its specific objects.

## Prerequisites

Install [Node.js](https://nodejs.org/) v4 (LTS). [nvm](https://github.com/creationix/nvm) is a nice tool to manage multiple Node.js versions.

## oVirt setup

Install and configure oVirt as described in [this wiki](http://www.ovirt.org/Quick_Start_Guide).

Symlink plugin files to `ui-plugins` directory:

```
cd /usr/share/ovirt-engine/ui-plugins
ln -s /path/to/ovirt-dashboard-ui-plugin/dist/dashboard.json dashboard.json
ln -s /path/to/ovirt-dashboard-ui-plugin/dist/dashboard-resources dashboard-resources
```

## Plugin setup

Run `npm i` to install dependencies.

Use `npm run dev` to build plugin for development and watch & recompile files on change.

Use `npm run build` to build plugin for production.

## Access plugin via WebAdmin UI

Once built, open `https://engine.example.com:8443/ovirt-engine/webadmin/WebAdmin.html` in your browser.

There should be a **Dashboard** main tab present in WebAdmin UI.
