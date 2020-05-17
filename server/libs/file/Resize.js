// Resize.js

const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class Resize {
	constructor(width, height, exp) {
		this.folder = './uploads/';
		this.width = width;
		this.height = height;
		this.exp = exp;
	}

	async save(buffer) {
		const filename = this.getFileName();
		const filepath = this.getFilePath(filename);

		await sharp(buffer)
			.resize(this.width, this.height, {})
			.toFile(filepath);

		return filename;
	}

	getFileName() {
		return `${uuidv4()}${this.exp}`;
	}

	getFilePath(filename) {
		return path.resolve(`${this.folder}/${filename}`);
	}
}

module.exports = Resize;
