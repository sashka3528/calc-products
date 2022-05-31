
let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');

function createCell(tr, value, name) {
        let td = document.createElement('td');
        td.innerHTML = value;
        td.classList.add(name);

        return tr.appendChild(td);
}

function recountTotal() {
        let costs = table.querySelectorAll('.cost');
        total.innerHTML = 0;

        if (costs) {
                for (let cost of costs) {
                        total.innerHTML = +total.innerHTML + +cost.innerHTML;
                }
        }
}

function allowEdit(td) {
        td.addEventListener('dblclick', function allow() {
                let input = document.createElement('input');
                input.value = td.innerHTML;
                td.innerHTML = '';
                td.append(input)
                input.focus();

                this.addEventListener('keydown', function(event) {
                        if (event.code == 'Enter') {
                                td.innerHTML = input.value;
                                input.remove();

                                if (td.classList.contains('price') || td.classList.contains('amount')) {
                                        let tr = td.parentElement;

                                        let price = tr.querySelector('.price');
                                        let amount = tr.querySelector('.amount');
                                        let cost = tr.querySelector('.cost');

                                        cost.innerHTML = price.innerHTML * amount.innerHTML;
                                        total.innerHTML = 0;
                                        
                                        let costs = table.querySelectorAll('.cost');
                                        if (costs) {
                                                for (let cost of costs) {
                                                        total.innerHTML = +total.innerHTML + +cost.innerHTML;
                                                }
                                        }
                                }
                        }

                        this.addEventListener('dblclick', allow);
                });

                this.removeEventListener('dblclick', allow);
        });
}

add.addEventListener('click', function() {
        let tr = document.createElement('tr');
        
        allowEdit(createCell(tr, name.value, 'name'));
        allowEdit(createCell(tr, price.value, 'price'));
        allowEdit(createCell(tr, amount.value, 'amount'));
        createCell(tr, price.value * amount.value, 'cost');

        let remove = createCell(tr, 'удалить', 'remove');
        remove.addEventListener('click', function() {
                tr.remove();
                recountTotal();
        });
        
        table.appendChild(tr);
        recountTotal();
});