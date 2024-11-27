export class HomeController {
    static async homePage(req, res) {
        const popularUrls = [
            'url1',
            'url2',
            'url3'
        ]

        return res.json({
            message: 'Popular urls loaded successfully.',
            data: popularUrls
        })
    }
}
