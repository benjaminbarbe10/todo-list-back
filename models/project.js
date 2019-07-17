const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
        },
        tags: {
            type: Array,
        },
        htag: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        cities: {
            type: String,
        },
        surface: {
            type: Number,
        },
        budgect: {
            type: String,
        },
        duration: {
            type: Number,
        },
        text_area: {
            type: Object,
        },
        images: {
            type: Object,
        },
        projects: {
            type: Object,
        },

    },
    {
        versionKey: false
    }
);



const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
