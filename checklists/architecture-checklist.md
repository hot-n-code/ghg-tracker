# Architecture Checklist

Best practices concerning the overall architecture (file and directory structure) of the system.

### Arch-01: Obey file name conventions.

Are the files named according to our conventions?

 * Directories use lowercase with - between words.
 * Files use camel case.

### Arch-02: Obey directory structure.

Are files located in the appropriate directory?

```
app/
    imports/
            api/
            startup/
            ui/
```

### Arch-03: Are new directories consistent with existing directories?

Check to make sure that newly created directories are consistent in location and meaning with other directories.
