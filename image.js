'use strict';

import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const ImageSchema = mongoose.Schema({
    location:{ type: SchemaTypes.String, required: true },
    image: { data:SchemaTypes.Buffer, contentType:SchemaTypes.String }
})

export default mongoose.model('challan', ImageSchema)