module.exports = {
    default: {
        tags: "not @skip",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/features/"
        ],
        dryRun: false,
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "summary",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json"
        ],
        parallel: 1,
        timeout: 1200000
    }
}