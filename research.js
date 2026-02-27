/**
 * Research Page JavaScript
 * Chart initialization and data visualization
 */

// Chart colors
const chartColors = {
    primary: 'rgba(79, 70, 229, 0.8)',
    secondary: 'rgba(6, 182, 212, 0.8)',
    accent: 'rgba(245, 158, 11, 0.8)',
    success: 'rgba(16, 185, 129, 0.8)',
    danger: 'rgba(239, 68, 68, 0.8)',
    warning: 'rgba(251, 146, 60, 0.8)',
    info: 'rgba(59, 130, 246, 0.8)'
};

// Initialize all charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initAdoptionChart();
    initBarriersChart();
    initAgeChart();
    initImpactChart();
});

// Chart 1: Digital Payment Method Adoption
function initAdoptionChart() {
    const ctx = document.getElementById('adoptionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['UPI', 'Mobile Wallets', 'POS Terminals', 'Card Payments', 'AEPS', 'None'],
            datasets: [{
                label: 'Percentage of Stores',
                data: [48, 32, 18, 15, 8, 38],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.accent,
                    chartColors.success,
                    chartColors.info,
                    chartColors.danger
                ],
                borderColor: [
                    'rgba(79, 70, 229, 1)',
                    'rgba(6, 182, 212, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '% of stores';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Payment Method'
                    }
                }
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {

    const pdfUrl = "SmartKirana.pdf";
    const container = document.getElementById("pdf-preview");
    const downloadBtn = document.getElementById("download-btn");

    // Load Only First 4 Pages
    function loadPdfPreview() {

        if (!container) return;

        // Clear previous preview if any
        container.innerHTML = "";

        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {

            const totalPagesToShow = 4;

            for (let pageNumber = 1; pageNumber <= totalPagesToShow; pageNumber++) {

                pdf.getPage(pageNumber).then(function (page) {

                    const scale = 1.2;
                    const viewport = page.getViewport({ scale: scale });

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    container.appendChild(canvas);

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext);
                });
            }
        }).catch(function (error) {
            console.error("Error loading PDF:", error);
        });
    }

    // Handle Download Button
    function handleDownload(event) {
        event.preventDefault();

        showNotification();

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "SmartKirana_Full_Paper.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Notification UI
    function showNotification() {

        const notification = document.createElement("div");

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: #10b981;
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease forwards;
        `;

        notification.innerHTML = "Download Started...";

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease forwards";
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Add animation styles dynamically
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes slideIn {
            from { transform: translateX(300px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(300px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Attach Event Listener
    if (downloadBtn) {
        downloadBtn.addEventListener("click", handleDownload);
    }

    // Load Preview Automatically
    loadPdfPreview();

});
