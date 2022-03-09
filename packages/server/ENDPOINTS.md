# End Points

## /pages/home

Returns general information about me. Content that populates the home page.

```js
{
  hero: {
    sectionId: "hero",
    title: "design/dev",
    summary: "such and such",
    mainImage: {
      src: "https://aws.com/fdsfsfds.jpg",
      alt: "photo of me",
      width: "1500px",
      height: "800px"
    }
  },
  bio: {
    sectionId: "bio",
    title: "Bio",
    summary: "Here's some stuff about me"
  },
  caseStudies: {
    sectionId: "case-studies",
    title: "Case Studies",
    summary: "Some stuff I've been working on."
  }
}
```

## /case-studies

All case studies

| **param** | **type**    | **default** |
| --------- | ----------- | ----------- |
| author    | author.name |             |
| limit     | number      | 10          |
| offset    | number      | 0           |
| tags      | tag.name    |             |

```js
{
  title: "Project Title",
  summary: "Quick description.",

}
```

### Query Details

-   Should join with authors

## /case-studies/:id

Single case study

## /authors

## /authors/:id
