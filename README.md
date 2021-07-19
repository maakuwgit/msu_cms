Mac Install
To do either install, you'll need to have the latest version of Node.js, as well as the latest version of Docker. This will allow seamless startup of the system without Composer or Artisan global installations, nor reliance on XAMP or MAMP

1) Run "curl -s https://laravel.build/msu__cms | bash" to download a fresh install of Laravel to your current folder
2) Type "cd msu__cms" to navigate to the directory
3) Type "npm install" to build grab your modules and build out the core folders
4) Run the following script to create a shortcut so you don't have to keep typing all this crap: alias sail='bash ./vendor/bin/sail'*
5) Start Docker, if it's not already running
6) Type "sail up" to start a fresh Docker instance and spool up a database
7) We want to add our login stuff using "sail composer require laravel/breeze --dev"

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
9) Open XAMPP and start the Apache and MySQL processes. If you don't do this, "php artisan" any other "php", commands won't work. Create the SQL table 'msu_cms'.
11) Choose the .env.xampp file and duplicate it. Renamie it to ".env"
10) Finally, run "php artisan serve". This starts your server up.
11) Optionally: If this is NOT a mirror machine on INITIAL SYSTEM INSTALL, and this is your core machine, run "php artisan migrate:fresh --seed"

*If you'd like to have Laravel Sail setup with the shortcut globally (that's my vibe, personally) edit your bashrc! It differs on Windows and Mac, so do a search for your personal terminal shortcut

Restoring a corrupt PC Install:
Occasianally, an update will corrupt your install. In this case try these steps in order of most destructive!
1) 'npm install' : this is the easiest, and least damaging fix. It simple reinstalls what you have
2) Delete your "node_modules" folder, then run 'npm install' : this is also easy, but removes any changes to moduels made to remove warnings ie: bootsrap math.div, which is a depraction that we have fixed locally, but yet to fork.
3) Delete your "package.lock" file, AND your "node_modules" folder : Similar to above, but also removes any settings the Dev made that worked on the INITIAL install, that may not work post-windows-update

Startup on a Windows Machine:
1) Startup and login as normal
2) Open XAMPP, then click the "start" button for MySQL and Apache. Ignore the rest
3) Open Command Prompt, then navigate to the correct folder using "cd Sites/msu_cms"
4) Start the PHP server using "php artisan serve"
5) Open Chrome and navigate to 127.0.0.1:8000 and you should see everything.

Getting rid of annoying Warnings and Breaking Changes:
A few things, some specific to OS, will need to be addressed before a production build will eport correctly
1) Bootstrap 5, a great tool that it is, still relies on some old tech, and old styles it promises to update in 5.5. Fix the SASS math warning using the sass-migrator plugin. Simply run 'npm install -g sass-migrator'. It will ONLY work globally. After it's install, run 'sass-migrator division **/*.scss' and it'll ANY scss math div issues present in your buildable files!
https://sass-lang.com/documentation/breaking-changes/slash-div

Possible known problems solved:
If, at some point, you've been manually screwing around with the Seeders, Factories, or Migrations, it's a good bet you've screwed up the migration by now! If you run into a wall, try these remedies before trashing everything:
a) 'sail composer dump-autoload -o' or 'composer dump-autoload -o': this re-aligns the autoload to your changes to routes and paths. Doesn't always work, but it's the first step.
b) Ensure that Laravel didn't put all your "seeders" in a "seeds" directory. Not sure why this misnaming happens, I believe it to be a legacy effect for the move from 7.x to 8.x
c) If you're making new routes manually, or have a fresh install that doesn't seem to recognize your routes, try using "sail artisan route:clear" or "php artisan route:clear" to purge out the old stuff and re-evaluate the routes outlined by composer even if they're new
If you make updates to your environment that aren't being represented in the visuals, try updating the composer install. That should recognize any missing pieces. Use the command "sail composer update"

..if these don't work, then you're got a bigger problem. Check the list below for some suggested fixes known to work in the past:

If you're getting a blank page when you load of 127.0.0.1 with a message reading "This site can’t be reached" or "ERR_CONNECTION_REFUSED", then you don't have the server running.
If you try to start the server using artisan serve and it doesn't start, you don't have XAMPP running
If you're seeing the XAMPP dashboard page, then you don't have the port appended to the IP.
If the site loads, but all the continents are white, check the Console log to ensure the DB is loading. It's likely loading from the wrong address (//0.0.0.1 if you're using Sail, //127.0.0.1 for MAMP/XAMPP). One of two things is happening: Either a) you're still running the last version checked in from the original repo. This will always be 0.0.0.1 since on Mac we use Sail. Conversely, b) 
If you see "InvalidArgumentException", and the command prompt nags you to "Please provide a valid cache path." it's because the repo has trashed our empty folders inside the storage folder. Just manually add a folder for "framework", then folders "cache", "sessions", and "views" inside of it. Try serving through artisan again, it should fire
If you see "Module not found: Error: Can't resolve '@popperjs/core'" then you've tried to startup the system without the latest version of "popper". This is the functionaly behind ALL modals, menus and Bootstrap in general. Run "npm install @popperjs/core" to re-install it. Now try refreshing the page.
If you check your connections, but your DB STILL won't connect, ensure that your .env file is pointing to the right database. The constant "DB_DATABSE" should be 'msu_cms', not 'msu__cms__updated'. This has been fixed globally, but may be an issue for you locally.