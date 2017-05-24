### Program structure: 
 

```bash
├── Editing
│   ├── Bigbang.html
│   ├── MyGirl.html
├── Preview
│   ├── Bigbang.html
│   ├── MyGirl.html
├── css
│   ├── about.css
│   ├── bigbang.css
│   ├── customboostrap.css
│   ├── index.css
│   ├── mygifts.css
│   ├── mygirl.css 
│   └── style.css
├── images
│   ├──*.png
│   ├──*.jpg
│   ├── homepage 
│   │   ├── *.png
│   │   ├── *.jpg
├── js
│   ├── bigbang.js
│   ├── config.js
│   ├── index.js
│   ├── moment.js
│   ├── mygifts.js
│   ├── mygirl.js
│   ├── notify.js
│   └── utils.js
├── README.md
├── about.html
├── index.html
└── mygifts.html
```

### Implemetation overview
1. Main js implementation:
    - **bigbang.js** : logic for the each gift of type bigbang for three modes: editing, previewing, and receiving.
	- **mygirl.js**: logic for the each gift of type mygirl for three modes: editing, previewing, and receiving.
	- **mygifts.js**: logic for managing gifts with actions such as previewing, editing, coping link, removing gift, changing gift title, filtering gifts
	
2. Main html implementation
    - **Group 1**: this group is for editing, previewing, and receiving gifts. For each gift, there is a html file for editing (in Editing folder), and an html file for previewing and receiving (in Preview folder) 
    
    ```
    ├── Editing
    │   ├── Bigbang.html
    │   ├── MyGirl.html
    ├── Preview
    │   ├── Bigbang.html
    │   ├── MyGirl.html

    ```
	
    - **Group 2**
        - **index.html**: home page
        - **about.html**: about page
        - **mygifts.html**: mygifts page (managing gifts)