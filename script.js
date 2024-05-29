document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transactionForm');
    const transactionList = document.getElementById('transactionList');
    const balanceElement = document.getElementById('balance');
    const exportBtn = document.getElementById('exportBtn');
    const historyTableBody = document.querySelector('#historyTable tbody');
    let transactions = [];
    let balance = 0;

    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function addTransaction(type, amount, description) {
        const transaction = { type, amount: parseInt(amount), description, date: new Date().toLocaleString() };
        transactions.push(transaction);

        const transactionElement = document.createElement('li');
        const icon = type === 'pemasukan' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-arrow-up"></i>';
        transactionElement.innerHTML = `<span>${icon} <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${description}</span> <span>Rp${formatCurrency(amount)}</span>`;
        transactionList.appendChild(transactionElement);

        if (type === 'pemasukan') {
            balance += parseInt(amount);
        } else {
            balance -= parseInt(amount);
        }

        updateBalance();
        updateHistoryTable();
    }

    function updateBalance() {
        balanceElement.innerHTML = `<i class="fas fa-wallet"></i> Saldo: Rp${formatCurrency(balance)}`;
        if (balance >= 0) {
            balanceElement.style.color = 'green';
        } else {
            balanceElement.style.color = 'red';
        }
    }

    function updateHistoryTable() {
        historyTableBody.innerHTML = '';
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${transaction.date}</td><td>${transaction.type}</td><td>Rp${formatCurrency(transaction.amount)}</td><td>${transaction.description}</td>`;
            historyTableBody.appendChild(row);
        });
    }

    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const type = document.getElementById('type').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;

        addTransaction(type, amount, description);

        // Reset form fields
        transactionForm.reset();
    });

    exportBtn.addEventListener('click', function() {
        const wb = XLSX.utils.book_new();
        const ws_data = [['Tanggal', 'Jenis', 'Jumlah (Rp)', 'Deskripsi']];

        transactions.forEach(transaction => {
            ws_data.push([transaction.date, transaction.type, formatCurrency(transaction.amount), transaction.description]);
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, 'Transaksi');

        XLSX.writeFile(wb, 'transaksi_uang.xlsx');
    });

    window.openTab = function(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    // Initialize default tab
    document.getElementById("transaksi").style.display = "block";

    window.onload = function() {
        const tablinks = document.getElementsByClassName("tablink");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].addEventListener("click", function() {
                const current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                this.className += " active";
            });
        }
    };
});

document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById('loader');
    var content = document.getElementById('content');

    // Simulate a delay (e.g., loading content from server)
    setTimeout(function() {
        loader.classList.add('hidden');
        content.style.display = 'block';
    }, 2000);
});