import diariesData from "../../data/diaries.data";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = ():DiaryEntry[] =>{
    return diariesData;
};


const getNonSensitiveEntries = ():NonSensitiveDiaryEntry[] => {
     return diariesData.map(({ id, date, weather, visibility }) => ({
       id,
       date,
       weather,
       visibility,
     }));
};
const services = {
  getEntries,
  getNonSensitiveEntries,
};

export default services;