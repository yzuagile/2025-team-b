module.exports = {
    preset: "ts-jest",
    testMatch: ["**/*.test.ts"],
    collectCoverage: true,
    coverageReporters: ["json", "html", "junit"],
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: ".", outputName: "junit.xml" }]
    ]
}