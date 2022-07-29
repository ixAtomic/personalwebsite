


export interface cardsInt{
    id: number;
    attributes: {
        SummaryImage: {
            data: {
                attributes: {
                    url: ""
                }
            }
        }
        SummaryTitle: ""
    }
}

export interface ContentInt{
    SummaryTitle: "";
}

export interface PostsInt {
    id: number;
    BlogContent: any
    BlogContentHTML: string;
    ImagePosition: boolean;
  }
