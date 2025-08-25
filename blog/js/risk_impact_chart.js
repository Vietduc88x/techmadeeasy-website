document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById("riskImpactChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Minor", "Moderate", "Major"],
            datasets: [{
                label: "Impact (Cost in $)",
                data: [50000, 500000, 5000000],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 1
            }, {
                label: "Impact (Delay in Weeks)",
                data: [1, 4, 12],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(201, 203, 207, 0.6)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(201, 203, 207, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


