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

Windows 10 Install
On the initial commit, there should be a "vendor 2" folder. Change that to just read "vendor". Typically, this folder is automatically ignored by Git. Renaming it seems to be the only way to get the git to accept this folder as valid content.

1) Download and install Sourcetree from "https://downloadsapachefriends.global.ssl.fastly.net/8.0.7/xampp-windows-x64-8.0.7-0-VS16-installer.exe?from_af=true"
2) Download and install Node.js from "https://nodejs.org/dist/v14.17.1/node-v14.17.1-x64.msi"
3) Download and install XAMPP from "https://downloadsapachefriends.global.ssl.fastly.net/8.0.7/xampp-windows-x64-8.0.7-0-VS16-installer.exe?from_af=true"
4) Download and install Composer from "https://getcomposer.org/Composer-Setup.exe"
5) If you have a Windows 10 Machine with an 1892+ build, you'll have Bash. turn on Bash functionality. You can pull down the update from "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi". If your Windows Store is acting up, try grabbing this stop-gap to get it working: "https://codeload.github.com/kkkgo/LTSC-Add-MicrosoftStore/zip/refs/heads/master"
6) If step 5 is true, start at step #1 for Mac install. If not, jump to step 7
7) Install popper.js's update using "npm install @popperjs/core". This will fix an inconsistency between Windows and PC. Since the original Dev was in Mac, popper.js (an older version) is still the base. This will be updated later.
8) Run "composer update" to align any plugins provided by the vendor, required for the project
9) Open XAMPP and start the Apache and MySQL processes. If you don't do this, "php artisan" any other "php", commands won't work
11) Choose the .env.xampp file and duplicate it. Renamie it to ".env"
10) Finally, run "php artisan serve". This starts your server up.
11) Optionally: If this is NOT a mirror machine on INITIAL SYSTEM INSTALL, and this is your core machine, run "php artisan migrate:fresh --seed"


*If you'd like to have Laravel Sail setup with the shortcut globally (that's my vibe, personally) edit your bashrc! It differs on Windows and Mac, so do a search for your personal terminal shortcut

If, at some point, you've been manually screwing around with the Seeders, Factories, or Migrations, it's a good bet you've screwed up the migration by now! If you run into a wall, try these remedies before trashing everything:
a) 'sail composer dump-autoload -o' or 'composer dump-autoload -o': this re-aligns the autoload to your changes to routes and paths. Doesn't always work, but it's the first step.
b) Ensure that Laravel didn't put all your "seeders" in a "seeds" directory. Not sure why this misnaming happens, I believe it to be a legacy effect for the move from 7.x to 8.x
c) If you're making new routes manually, or have a fresh install that doesn't seem to recognize your routes, try using "sail artisan route:clear" or "php artisan route:clear" to purge out the old stuff and re-evaluate the routes outlined by composer even if they're new
If you make updates to your environment that aren't being represented in the visuals, try updating the composer install. That should recognize any missing pieces. Use the command "sail composer update"

Restoring a corrupt PC Install:
Occasianally, an update will corrupt your install. In this case try these steps in order of most destructive!
1) 'npm install' : this is the easiest, and least damaging fix. It simple reinstalls what you have
2) Delete your "node_modules" folder, then run 'npm install' : this is also easy, but removes any changes to moduels made to remove warnings ie: bootsrap math.div, which is a depraction that we have fixed locally, but yet to fork.
3) Delete your "package.lock" file, AND your "node_modules" folder : Similar to above, but also removes any settings the Dev made that worked on the INITIAL install, that may not work post-windows-update