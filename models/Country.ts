import mongoose, { Schema, model, Model } from 'mongoose';
import { ICountry } from '../interfaces';


const countrySchema = new Schema({
    name:     { type: String, required: true },
    code:     { type: String, required: true },
});

const Country:Model<ICountry> = mongoose.models.Country || model('Country', countrySchema);

export default Country;