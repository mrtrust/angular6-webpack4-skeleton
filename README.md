# Angular Skeleton 6
## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies or `yarn`
* `npm start` to start the dev server in another tab



# Core scripts
- `npm install`  - to install modules
- `npm start` - to start local webpack-dev-server (using environment
 from config/config.enviroments.json or from config/config.environments.local.json if present)
- `npm build:(local|dev|qa|stage|prod|local)` to build files related to enviroment
 (please note dev|qa uses wepback.dev config, stage|prod uses webpack.prod config), JIT builds
- Add `build:(local|dev|qa|stage|prod|local)::aot` to build AoT builds
- `npm run test` - to start watch karma tests described in src/\*\*.\*\*.spec.ts files,
to make Karma work correct TS version is 2.8 otherwise, global Jasmine vars are not available
- `npm run test:single` - for single run
- `npm run e2e` - to start E2E tests described in src/\*\*.\*\*.e2e.ts files,
e2e script uses http-server and  tests complied dist directory
- `npm run e2e:(local|dev|qa|stage|prod|local)` executes build with chosen env then run e2e tests

# AoT Don'ts
The following are some things that will make AoT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use `form.controls.controlName`, use `form.get(‘controlName’)`
- Don’t use `control.errors?.someError`, use `control.hasError(‘someError’)`
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- @Inputs, @Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Install docker

#### MacOS:

`brew cask install docker`

And run docker by Mac bottom menu> launchpad > docker (on first run docker will ask you about password)

#### Ubuntu:

```
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo systemctl status docker  # test: should be ‘active’
```
And add your user to docker group (to avoid `sudo` before using `docker` command in future):
```
sudo usermod -aG docker $(whoami)
```
and logout and login again.

### Build image

Because *node.js* is big memory consumer you need 1-2GB RAM or virtual memory to build docker image
(it was successfully tested on machine with 512MB RAM + 2GB virtual memory - building process take 7min)

Go to main project folder. To build image type:

`docker build -t skeleton-angular-6 .`

The **skeleton-angular-6** name used in above commands is only example image name.
To remove intermediate images created by docker on build process, type:

`docker rmi -f $(docker images -f "dangling=true" -q)`

### Run image

To run created docker image on [localhost:8080](localhost:8080) type (parameter `-p 8080:80` is host:container port mapping)

`docker run --name skeleton-angular-6 -p 8080:80 skeleton-angular-6 &`

And that's all, you can open browser and go to [localhost:8080](localhost:8080).

### Build and Run image using docker-compose

To create and run docker image on [localhost:8080](localhost:8080) as part of large project you may use **docker-compose**. Type

`docker-compose up`

And that's all, you can open browser and go to [localhost:8080](localhost:8080).
### Login into docker container

`docker exec -t -i skeleton-angular-6 /bin/bash`