<template>
<div class='container'>
    <div>
        <table class='minimalistBlack' >
        <thead>
                <tr>
                    <th  v-for='header in headers' :key='header.index'>{{header.text}}</th>
                </tr>
        </thead>
        <tbody>
            <tr v-for='value in values' :key='value.index'> 
                <td><v-text-field v-model='value.unit' single-line dense/></td>
                <td><v-text-field v-model='value.reach[0]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[1]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[2]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[3]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[4]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[5]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[6]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[7]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[8]' single-line dense/></td>
                <td><v-text-field v-model='value.reach[9]' single-line dense/></td>
            </tr>
        </tbody>
        </table>
            <div class='container'>
                <v-btn class="button" @click="addRow"> Добавить ряд </v-btn>
                <v-btn class="button" @click="deleteRow"> Удалить ряд </v-btn>
                <v-btn class="button" @click='saveTableToServer'> Сохранить </v-btn>
                <v-btn class="button" @click='fillData'>Построить график</v-btn>
            </div>
        </div>
        <LineChart :chart-data='dataChart' :options='options'/>
    </div>
</template>

<script>
    import LineChart from '@/components/LineChart'
    
    export default {
    components: {LineChart},
    data: () => {
        return {
            options: { 
                responsive: true,
                maintainAspectRatio: false
            },
            
            dataChart: null,
            values: null,
            loaded: false,
            headers: [
                {
                    text: 'Unit',
                    align: 'start',
                    sortable: false,
                    value: 'unit',
                },
                { text: 'Reach% 1+', value: 'reach1'},
                { text: 'Reach% 2+', value: 'reach2'},
                { text: 'Reach% 3+', value: 'reach3'},
                { text: 'Reach% 4+', value: 'reach4'},
                { text: 'Reach% 5+', value: 'reach5'},
                { text: 'Reach% 6+', value: 'reach6'},
                { text: 'Reach% 7+', value: 'reach7'},
                { text: 'Reach% 8+', value: 'reach8'},
                { text: 'Reach% 9+', value: 'reach9'},
                { text: 'Reach% 10+', value: 'reach10'},
            ],
        }
        
    },
    methods: {
        getTableToRender(){
            this.$store
                .dispatch("getTableToRender")
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    //alert(response.status)
                    this.values=JSON.parse(localStorage.getItem('tableToRender'))
                })
                // eslint-disable-next-line no-unused-vars
                .catch(error => {
                    //alert(error.response.status)
                })
        },
        addRow() {  
            this.values.push({unit: '', reach:['','','','','','','','','','']});
        },
        deleteRow() {
            this.values.pop()
        },
        fillData() {
            let colorData = ['red', 'orange', 'yellow', 'green', 'cian', 'blue', 'magenta', 'violet', 'black', 'grey']
            this.dataChart = {
                labels: [],
                datasets:[],
            }
            for (let i=0; i<10; i++)
            {
                this.dataChart.datasets.push({label:'', fill: 'false', borderColor:'', data:[]});
            }
            for (let j=0; j<10; j++)
            {
                this.dataChart.datasets[j].label=this.headers[j+1].text;
                this.dataChart.datasets[j].borderColor=colorData[j];
                for (let i=0; i<this.values.length; i++)
                {  
                    this.dataChart.labels[i]=this.values[i].unit
                    this.dataChart.datasets[j].data[i]=this.values[i].reach[j]
                }
            }
            this.loaded=true;
        },
        saveTableToServer(){
            if (this.validateTable(this.values)) {
                localStorage.setItem('tableToRender', JSON.stringify(this.values));
                this.$store
                    .dispatch("saveTableToServer"
                    )
                    // eslint-disable-next-line no-unused-vars
                        .then(response => {
                            alert('Изменения сохранены')
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(error => {
                       alert(error.response.status)
                    
                });
            }
        },
        validateTable(values){
            for (let i=0; i<values.length; i++) {
                if (values[i].reach.includes('')) {
                    alert('Пожалуста, заполните все ячейки');
                    return false;
                }
                else if (values[i].reach.some(isNaN)) {
                    alert('В ряду '+ i + ' есть не числовое значение');
                    return false;
                }
                else for(var j = 0 ; j < values[i].reach.length - 1 ; j++){
                    if(parseInt(values[i].reach[j]) < parseInt(values[i].reach[j+1])) {
                        alert('В ряду '+ i + ' значения не убывают');
                        return false;
                    }
                }
                
             }
            return true;
        }
    },
    mounted: function() {
        this.getTableToRender()
        this.values=JSON.parse(localStorage.getItem('tableToRender'))
        
    },
}
</script>
    
<style>
    .container{
        display: flex;
        flex-direction: row;
        align-items: flex-start
    }
    .button{
        margin: auto;
    }
    table.minimalistBlack {
        border: 3px solid #000000;
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }
        table.minimalistBlack td, table.minimalistBlack th {
        border: 1px solid #000000;
        padding: 5px 4px;
    }
        table.minimalistBlack tbody td {
        font-size: 13px;
    }
    table.minimalistBlack thead {
        background: #CFCFCF;
        background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        border-bottom: 3px solid #000000;
    }
    table.minimalistBlack thead th {
        font-size: 15px;
        font-weight: bold;
        color: #000000;
        text-align: left;
    }
    table.minimalistBlack tfoot {
        font-size: 14px;
        font-weight: bold;
        color: #000000;
        border-top: 3px solid #000000;
    }
        table.minimalistBlack tfoot td {
        font-size: 14px;
    }
</style>