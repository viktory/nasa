/* eslint-disable camelcase */
export interface ImageResponse {
  href: string;
  data: {
    title: string,
    description: string;
    date_created: string;
    nasa_id: string;
  }[];
  links:{
    href: string
  }[]
}

export const transformData = ({
  data: [{
    nasa_id: id, title, description, date_created: dateCreated
  }], links: [{ href: preview }]
}: ImageResponse) => ({
  id,
  title,
  description,
  date: (new Date(dateCreated)).toLocaleDateString('en-US'),
  preview,
  href: preview.replace('~thumb.jpg', '~orig.jpg') // not robust at all, better to load origin from API
});
