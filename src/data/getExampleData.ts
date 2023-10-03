export type FakeDataStructure = typeof fakeLineData

const fakeLineData = [
    {
        region: 'Din praksisk',
        data: [24.95, 17.3, 37.1, 5.61, 43.94, 35.45, 43.89, 28.06, 45.06, 5.71, 38.23, 7.01],
    },
    {
        region: 'Oslo',
        data: [47.79, 9.04, 34.8, 19.33, 10.1, 12.3, 21.69, 41.8, 47.81, 45.64, 7.86, 45.15],
    },
    {
        region: 'Resten av landet',
        data: [25.95, 17.2, 12.32, 28.86, 34.03, 12.95, 8.35, 3.13, 26.08, 28.34, 43.48, 42.91],
    },
]

export async function getExampleData(): Promise<typeof fakeLineData> {
    if (!process.env.CI) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return fakeLineData
}
