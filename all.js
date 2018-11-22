var app = new Vue({
    el: '#app',
    data: {
        
        data: [],
        locations: [],
        currentPage: 0,
        currentLocation: '',
        pages: 0,
    },
    methods: {
        getUniqueList() {
            const locations = new Set();
            const vm = this;
            
            vm.data.forEach((item,key) => {

                locations.add(item.Zone)
                
            })
            console.log(locations);
            vm.locations = Array.from(locations); //將資料轉成陣列格式
        }
    },
    computed:{
        filterData(){
            const vm = this;
            let items = [];
            if(vm.currentLocation !== ''){
                items = vm.data.filter((item,key) => {
                    console.log(item);
                    return item.Zone == vm.currentLocation;
                })
            }else{
                items = vm.data;
            }

            // newData = [[1..],[2...],[3...]]
            const newData = [];
            items.forEach((item,key) => {  
                if(key % 10 === 0 ){    
                    newData.push([]);
                    // console.log(newData);
                }
                const page = parseInt(key / 10);
                // console.log(page);
                newData[page].push(item);
            })
            // console.log(newData);
            return newData;
        }
    },
    created(){
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(function (response) {
            // handle success
            console.log(response);
            vm.data = response.data.result.records;
            console.log(vm.data)
            vm.getUniqueList();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
});