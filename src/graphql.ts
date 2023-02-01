import gql from 'graphql-tag'

export const GET_LANDING_PAGE = gql`
    query getLandingPageData{
        Landing{
            MainImage {
                id
            }
        }
    }
`;

export const GET_ABOUT_PAGE = gql`
    query getAboutPageData{
        About{
            Resume {
                id
            }
            AboutImage {
                id
            }
            AboutContent
        }
    }
`;

export const GET_CONTACT_PAGE = gql`
    query getContactPageData{
        Contact{
            ContactContent
            ContactLinks{
                LinkName
                Link
            }
        }
    }
`;

export const GET_BLOG_PAGE = gql`
    query getBlogPageData{
        Blog{
            id
            BlogID{
                id
                Title
                status
                BlogImage{
                    id
                }
            }
        }
    }
`;

export const GET_BLOGPOST_PAGE = gql`
    query getBlogPostData($BlogID: ID!) {
        BlogPosts_by_id(id: $BlogID){
            id
            Title
            BlogImage{
                id
            }
            SectionID{
                id
                SectionImage{
                    id
                }
                SectionContent
                Position
            }
            status
        }
    }
`;
