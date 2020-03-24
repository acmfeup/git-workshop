# Git Workshop (approx. 2hours)

In this workshop we will learn the basic functionalities of Git and how these can improve our team workflow.
Most of this workshop will be conducted using a bash shell and as such some basic command line usage will also be exposed

### Setup (10min)

Download [repository files to fix]()

<span style="text-decoration:underline">Software Requirements:</span>

Bash Shell

Git - [Download Here](https://git-scm.com/downloads)

Wondows Remarks:
- Git provides a usable Bash shell after installation
- Microsoft provides an integrated Linux subsystem through it's [store](https://www.microsoft.com/store/productId/9NBLGGH4MSV6)

### Create a repository (5min)

The first step in using git is creating a repository. For this end we will create a new folder and initiate an empty repository inside it

<code>
mkdir MyGitWorkshop
cd MyGitWorkshop
git init
</code>

### Sorting Files in our repository (10min)

Now that we have a repository we should add files to it. Lets start by moving our downloaded zip file and decompressing it in our repository folder

<code>
mv RepositoryThatNeedsFixing.zip MyGitWorkshop
(unzip the archive)
7z x RepositoryThatNeedsFixing.zip
</code>

Using the ls command we can list the files in the directory. After confirming that we successfully extracted the necessary files we proceed to removing the, no longer required, zip archive.

<code>
ls -la
rm RepositoryThatNeedsFixing.zip
</code>

Now to sort our files, lets create 3 folders css, js, lib. Move each file to their respective folder accordingly to the it's extension.

<code>
mkdir css
mkdir js
mkdir lib
mv *.js js
mv *.css css
mv *.lib lib
</code>

### Adding files to our repository (15min)

Our repository is still empty so lets add all our files in one go (definetly not advisable but lets see why later)

<code>
git add -A
git status
</code>

As expected git add with option -A will add all files to our staging area which in most cases is not desirable, especially when setting up a repository with a complex project with loads of non-code files.

<code>
git reset
git add index.html
git commit -m "Initial Commit"
</code>

We have finally committed a change to our repository. This means it is now part of the repository and will be registered in the logs unless it's explicitly deleted (a process too complex for this workshop)

<code>
git log
git log --oneline -1
git log -1 -p
</code>

So to fix the problem of adding unnecessary files there is a quite simple solution! Git works with a .gitignore file where we can explicitly say which paths should be ignored by Git. Let's try a simple one for this project.

<code>
git status
echo "/lib" >> .gitignore
git status
git add -A
git commit -m "Add javascript and css folders"
</code>

### Branching and Merging for Parallel Work (15min)

Branching is the great feature of Git that will allow us to work in parallel in different or even similar sections of code with relative independance. To start with lets check what branches we currently have and create a new one to edit our styles2.css file.

<code>
git branch
git branch improve_styles2
git checkout improve_styles2
git branch
</code>

As the star indicates we are currently working in our new branch. So lets edit our styles2.css file to make the text-align property to be "center" instead of "unset", then commit your changes when done.

<code>
(edit styles2.css)
git add css/styles2.css
git commit -m "Improve styles2"
</code>

We will now return to our master branch and assume another person, who is not as experienced using Git already edited the same file in this branch.

<code>
git checkout master
(edit styles2.css so that text-align is different than "center")
git add css/styles2.css
git commit -m "Improve styles2 in master (bc idk what i'm doing)"
</code>

We will now try to merge our changes in branch "improve_styles2" with our master branch and will run into a merge conflict because the same part of the same file has been edited in the two branhces (master and improve_styles2). At this stage we can make use of git status to make sure what our problems are and address them.

To solve this problem there are various possible solution but the result is always the same, we have to edit the styles2.css file and remove the characters added by Git signaling the conflict. In this situation we will choose to keep our change from branch improve_styles2.

<code>
git merge improve_styles2
(conflicts showup, merge is interrupted)
git status
(edit styles2.css)
git add css/styles2.css
(after all conflicts are resolved we may continue the merge with the command below or perform an explicit commit)
git merge --continue
git status
</code>

### Remote repository (25min)

Git works well at a local level but it wouldn't mean much if we couldn't work with other people. So we want to make our repository available online. In this workshop we will make use of GitHub an online free-to-use platform for hosting git repositories. Start by creating your accounts (if you don't have one already). Create an <strong>empty</strong> repository with a name of your choosing. After completing this steps lets add this repository as the remote for the local one we have been working on.

<code>
git remote add origin git@github.com:[yourusername]/[repositoryname].git
git remote -v
git push origin master
</code>

As expected you get an authentication error because the Github remote we just set up needs ssh keys to work. The pair of public/private keys that is generated allows git hub to verify that it's you who is accessing the repository and hence guarantee authentication without username/password. The way to generate these is runnign following command:

<code>
ssh-keygen
cat ~/.ssh/id_rsa.pub (or the save path you specified)
</code>

Using the cat command we can now copy the generated key and copy it into the github configuration in the "SSH and GPG Keys" section in settings. We should now be able to freely access our repository!

<code>
git push origin master
git push
(fails due to the lack of a default upstream, lets set it)
git branch -u origin/master
</code>

Lets now assume someone else made a change to our repository and we want to get those changes in our own computer. To simulate this lets use github hub to add a README.md file in our main repository page. Afterwards in our computer we can use fetch to receive all updates from our repository without changing the working tree. For the changes to take effect we must merge them.

<code>
git fetch
git log --oneline --all
git merge origin/master
git log --oneline --all
</code>



