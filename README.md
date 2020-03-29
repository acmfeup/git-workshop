# ACM `git` Workshop

**WIP**: An interactive Git workshop for the ultimate novice.

![git](https://git-scm.com/images/logo@2x.png) <img src="https://jupyter.org/assets/hublogo.svg" width="250"/>

This `git` workshop was created to run on a distributed [**JupyterHub**](https://jupyter.org/hub) instance, where each user has its own computational environments and resources without the burden of installation and maintenance tasks, bringing the power of [**Jupyter**](https://jupyter.org/) to a group of users at the same time.

Our deployment, due to the required low number of users per instance, used [**The Littlest JupyterHub**](https://github.com/jupyterhub/the-littlest-jupyterhub) (TLJH) in [**GCP**](https://cloud.google.com/) (Google Cloud Platform) and used [**bash_kernel**](https://github.com/takluyver/bash_kernel) to enable a Jupyter kernel for bash.

## Deployment

Deployment details for TLJH can be found [here](http://tljh.jupyter.org/en/latest/install/index.html) with the added step of configuring `bash_kernel` using:

```bash
sudo -E pip install bash_kernel
sudo -E python -m bash_kernel.install
```

The command `sudo -E` is very important when *admin* users can install packages since it is required to install within the User Environment, *i.e.*, the `conda` environment that is shared by all users in the JupyterHub instance.

To allow all users access to the necessary workshop files, one needs to create a folder within `/srv/data/`, in our case, we cloned this repository.

```bash
sudo git clone https://github.com/acmfeup/git-workshop.git
```

In this case, `sudo` is required since we are accessing folders only accessible by admins unless you access the server through ssh. 
After the command above, every user now has read access to the folder, but no easy way of accessing the files. 
To solve this problem, one only needs to access the user's skeleton directory, and, finally, creating a symbolic link to the required files.

```bash
cd /etc/skel
sudo ln -s /srv/data/git-workshop/messy_files messy_files
sudo ln -s /srv/data/git-workshop/workshop.ipynb workshop.ipynb
```

