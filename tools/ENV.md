# Environment Variables

For the run the database and application without issues, you'll need to populate some environment variables in your shell.  

At the root of this repository, execute the following to get set up correctly:

- Linux, Mac, WSL, or Git Bash:

```bash
cp ../envs/env.example.sh env.sh
chmod +x env.sh  
source env.sh        # you'll need to execute this every time you start the terminal
printenv             # sanity check
```

- Windows command prompt:

```bash
cp ../envs/env.example.bat env.bat
env.bat             # you'll need to execute this every time you start the terminal
set                 # sanity check
```

- Powershell

```bash
cp ../envs/env.example.psl env.ps1
./env.ps1           # you'll need to execute this every time you start the terminal
Get-ChildItem $env  # sanity check
```

As you can see, in either of those methods *you'll need to .  Instead of any of those methods, I highly recommend using [Direnv](https://direnv.net/):

```bash
cp ../envrc.example .envrc
direnv allow        # you'll only need to do this once*
```

As menionted, with *Direnv* (and with the hook installed in your shell's profile), just `cd`'ing into a directory with an *.envrc* file will add the environment variables to your shell.  *`*`*If you edit the file, the terminal will warn you to run `direnv allow` again.

