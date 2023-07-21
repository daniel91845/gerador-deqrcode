const qrCodeContainer = document.getElementById("qr-code");
const qrText = document.querySelector(".qr-text");
const downloadBtn = document.querySelector(".download");
const shareBtn = document.querySelector(".share-btn");
const lightColorInput = document.querySelector(".light");
const darkColorInput = document.querySelector(".dark");
const themeToggle = document.getElementById("theme-toggle");

const qrCode = new QRCode(qrCodeContainer, {
    width: 500,
    height: 500,
});

// Função para gerar o QR Code
function generateQRCode(text) {
    qrCode.clear();
    qrCode.makeCode(text);
}

// Função para baixar o QR Code
function downloadQRCode() {
    const qrCodeImage = qrCodeContainer.querySelector("img");
    if (qrCodeImage) {
        const link = document.createElement("a");
        link.href = qrCodeImage.src;
        link.download = "QRCode.png";
        link.click();
    }
}

// Função para compartilhar o QR Code
function shareQRCode() {
    const qrCodeImage = qrCodeContainer.querySelector("img");
    if (navigator.share && qrCodeImage) {
        navigator
            .share({
                title: "QR Code",
                text: "Confira este QR Code!",
                url: qrCodeImage.src,
            })
            .then(() => console.log("Compartilhado com sucesso"))
            .catch((error) => console.log("Erro ao compartilhar", error));
    } else {
        console.log("Compartilhamento não suportado neste navegador.");
    }
}

// Event listeners
qrText.addEventListener("input", (event) => {
    const text = event.target.value;
    generateQRCode(text);
});

downloadBtn.addEventListener("click", downloadQRCode);
shareBtn.addEventListener("click", shareQRCode);

// Lidar com a alternância de temas
themeToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
});

// Geração inicial do QR Code
generateQRCode(qrText.value);

// Feedback visual ao gerar o QR Code
function showQRCodeAnimation() {
    qrCodeContainer.classList.add("animate__animated", "animate__zoomIn");
    setTimeout(() => {
        qrCodeContainer.classList.remove("animate__animated", "animate__zoomIn");
    }, 500);
}

qrText.addEventListener("input", showQRCodeAnimation);
