Mac Install
To do either install, you'll need to have the latest version of Node.js, as well as the latest version of Docker. This will allow seamless startup of the system without Composer or Artisan global installations, nor reliance on XAMP or MAMP

1) Run "curl -s https://laravel.build/msu__cms | bash" to download a fresh install of Laravel to your current folder
2) Type "cd msu__cms" to navigate to the directory
3) Type "npm install" to build grab your modules and build out the core folders
4) Run the following script to create a shortcut so you don't have to keep typing all this crap: alias sail='bash ./vendor/bin/sail'*
5) Start Docker, if it's not already running
6) Type "sail up" to start a fresh Docker instance and spool up a database
7) We want to add our login stuff using "sail composer require laravel/breeze --dev"
8) Type "sail up" to start a fresh Docker instance and spool up a database with the existing data and our new CRUD setup!

PC Install
On the initial commit, there should be a "vendor 2" folder. Change that to just read "vendor". Typically, this folder is automatically ignored by Git. Renaming it seems to be the only way to get the git to accept this folder as valid content.

*If you'd like to have Laravel Sail setup with the shortcut globally (that's my vibe, personally) edit your bashrc! It differs on Windows and Mac, so do a search for your personal terminal shortcut

If, at some point, you've been manually screwing around with the Seeders, Factories, or Migrations, it's a good bet you've screwed up the migration by now. If you run into a wall, try sail composer dump-autoload -o to re-align the autoload to your changes. Doesn't always work, but it's the first step. Next, if that doesn't work, ensure that Laravel didn't put all your "seeders" in a "seeds" directory. Not sure why this misnaming happens, I believe it to be a legacy effect.
If you're making new routes manually, or have a fresh install that doesn't seem to recognize your routes, try using "sail artisan route:clear" to purge out the old stuff and re-evaluate the routes outlined by composer even if they're new
If you make updates to your environment that aren't being represented in the visuals, try updating the composer install. That should recognize any missing pieces. Use the command "sail composer update"