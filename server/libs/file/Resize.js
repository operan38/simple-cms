// Resize.js

const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class Resize {
	constructor(width, height) {
		this.folder = './uploads/';
		this.width = width;
		this.height = height;
	}

	async save(buffer) {
		const filename = Resize.filename();
		const filepath = this.filepath(filename);

		await sharp(buffer)
			.resize(this.width, this.height, {})
			.toFile(filepath);

		return filename;
	}

	static filename() {
		return `${uuidv4()}.jpg`;
	}

	filepath(filename) {
		return path.resolve(`${this.folder}/${filename}`);
	}
}
module.exports = Resize;
