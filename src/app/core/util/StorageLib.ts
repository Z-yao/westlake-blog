export const StorageLib = {
    setItem(param,data) {
        let middleObj = {};
        if(!!window.localStorage.getItem('westlakeBlog')) {
            middleObj = JSON.parse(window.localStorage.getItem('westlakeBlog'));
            middleObj[param] = data;
            window.localStorage.setItem('westlakeBlog', JSON.stringify(middleObj));
        } else {
            middleObj[param] = data;
            window.localStorage.setItem('westlakeBlog', JSON.stringify(middleObj)); 
        }
    },
    getItem(param) {
        let middleObj = {};
        if(!!window.localStorage.getItem('westlakeBlog')) {
            middleObj = JSON.parse(window.localStorage.getItem('westlakeBlog'));
            if(!!middleObj[param] || middleObj[param] == 0) {
                return middleObj[param]
            } else {
                return null
            }
        } else {
            return null
        }
    },
    removeItem(param) {
        let middleObj = {};
        if(!!window.localStorage.getItem('westlakeBlog')){
            middleObj = JSON.parse(window.localStorage.getItem('westlakeBlog'));
            if(middleObj[param] != undefined){
                delete middleObj[param]
            }
            window.localStorage.setItem('westlakeBlog', JSON.stringify(middleObj));
        }else{
            return
        }
    },
    clear() {
        window.localStorage.removeItem('westlakeBlog')
    }
}