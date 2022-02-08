const createImageBtn = document.querySelector('[data-js="createImage-btn"]');
const textParagraph = document.querySelector('[data-js="text"');
const mainSection = document.querySelector("main");
const image = new Image();

const imageCanvas = document.createElement("canvas");
const ctx = imageCanvas.getContext("2d");
imageCanvas.setAttribute("width", "500");
imageCanvas.setAttribute("height", "500");

const downloadBtn = document.createElement("a");

const getRandomSeed = () => Math.floor(Math.random() * 999);

const createRandomLink = () => {
	return `https://picsum.photos/seed/${getRandomSeed()}/500/500`;
};

const drawCanvaText = (text) => {
	ctx.font = "44px sans-serif";
	ctx.shadowColor = "black";
	ctx.fillStyle = "white";
	ctx.lineWidth = "5";
	ctx.strokeText(text, 100, 480);
	ctx.fillText(text, 100, 480);
};

const drawCanvaImage = () => {
	ctx.drawImage(image, 0, 0);
	drawCanvaText("Bom dia, grupo!");
};

const createImage = () => {
	let existImage = mainSection.children.item(2) !== null;

	if (!existImage) {
		image.onload = () => {
			textParagraph.style.display = "initial";
			drawCanvaImage();
			createImageBtn.innerHTML = "Gerar outra imagem";
		};
		image.src = createRandomLink();
		image.crossOrigin = "anonymous";
		imageCanvas.style.cursor = "pointer";
		mainSection.appendChild(imageCanvas);
	} else {
		image.onload = drawCanvaImage;
		image.src = createRandomLink();
	}
};

const downloadImagePNG = () => {
	downloadBtn.setAttribute("href", imageCanvas.toDataURL());
	downloadBtn.setAttribute(
		"download",
		`bom-dia-grupo-${Math.floor(Date.now() * Math.random())}.png`
	);
	downloadBtn.click();
};
createImageBtn.addEventListener("click", createImage);

imageCanvas.addEventListener("click", downloadImagePNG);
