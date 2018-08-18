export class ComicsModel {
    constructor(
        public title : string,
        public publisher : string,
        public img_url : string,
        public price : string,
        public contact : string,
        public description: string,
        public pages? : string[]
    ) { }
}