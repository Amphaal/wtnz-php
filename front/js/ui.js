
//hide loader bar
function hideLoader() {
    let loader = document.getElementById("loader");
    loader.classList.remove("fadeIn");
    loader.classList.add("fadeOut");
}

//show content
function showContent() {
    let content = document.getElementById("content");
    content.classList.add("animated");
    content.classList.add("delay-1s");
    content.classList.add("fadeIn");
}

//update loader bar
function updateProgress(evt){
    if (evt.lengthComputable){
        let percentComplete = (evt.loaded / evt.total)*100;  
        document.getElementById("loader-bar").style = "width:" + percentComplete + "%";
    } 
}

//generate genres UI
function generateFilterUI(id, dataFunc) {

    let target = document.querySelector('#' + id + ' .list');
    if (dataFunc == null) return false;

    let data = dataFunc();

    //purge current results
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    //if there is any data
    if (data) {
        Object.keys(data).reduce(function(result, current) {
            let item = document.createElement('div');
            item.innerHTML = current;
            item.dataset.count = data[current];
            item.dataset.nFilter = current;
            item.onclick = updateFilter;
            result.push(item);
            return result;
        }, [])
        .sort(function(a,b) {return b.dataset.count - a.dataset.count;})
        .forEach(function(item) { target.appendChild(item);});
    }

    return true;
}

//prepare sub elements of the filter
function prepareFilterUI(id) {
    let target = document.getElementById(id);
    target.classList.add("filterUI");
    
    let ph = document.createElement('div');
    ph.classList.add("ph");
    target.appendChild(ph);

    let list = document.createElement('div');
    list.classList.add("list");
    target.appendChild(list);
}

function alterFilterUI(id, filterCriteria) {


    let ui = document.getElementById(id);


    //ui filter greying not selected
    let list = document.querySelector('#' + id + ' .list');
    list.childNodes.forEach(function(curr) {
        let nodefilter = curr.dataset.nFilter;
        nodefilter == filterCriteria ? curr.classList.add("selected") : curr.classList.remove("selected");
    });

    //ui filter acordeon effect + placeholder filing
    let ph = document.querySelector('#' + id + ' .ph');
    if(filterCriteria) {
        ui.classList.add("hasSelection");
        ph.innerHTML = filterCriteria + ' »';
    } else {
        ui.classList.remove("hasSelection");
        ph.innerHTML = "";
    } 
    
    //ui filter prefix
    list.childElementCount || ph.innerHTML ? ui.classList.add("active") :  ui.classList.remove("active");
}

function displayAlbumInfos(dataFunc) {
    let data = dataFunc(); 

    let target = document.getElementById('albumInfos');

    //purge current results
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    if(data) {
        target.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    }
}