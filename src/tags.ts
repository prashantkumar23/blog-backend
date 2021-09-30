function generateRandomTags() {

    const tags = [
        "#javascript",
        "#typescript",
        "#web",
        "#programming",
        "#tutorial",
        "#react",
        "#python",
        "#css",
        "#devops",
        "#html",
        "#android",
        "#career",
        "#aws",
        "#node",
        "#discuss",
        "#java",
        "#opensource",
        "#php",
        "#github",
        "#docker",
        "#security",
        "#testing",
        "#angular",
        "#vue",
        "#git",
        "#laravel",
        "#dotnet",
        "#ruby",
        "#computerscience",
        "#azure",
        "#art",
        "#books",
        "#fiction",
        "#film",
        "#gaming",
        "#humour",
        "#music",
        "#gaming",
        "#nonfiction",
        "#photography",
        "#podcasts",
        "#poetry",
        "#tv",
        "#visualdesign",
        "#culture",
        "#food",
        "#language",
        "#makers",
        "#outdoors",
        "#pets",
        "#philosphy",
        "#sports",
        "#style",
        "#travel",
        "#fitness",
        "#health",
        "#mentalhealth",
        "#business",
        "#design",
        "#economy",
        "#freelancing",
        "#leadership",
        "#marketing",
        "#media",
        "#startups",
        "#ux",
        "#ui",
        "#money"
    ]

    let tagArray = [];

    for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
        const random = Math.floor(Math.random() * tags.length);
        //@ts-ignore
        tagArray.push(tags[random])
    }
    return tagArray
}

export default generateRandomTags;