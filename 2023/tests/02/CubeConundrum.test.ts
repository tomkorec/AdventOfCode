import { CubeConundrum } from "../../src/tasks/02/CubeConundrum";

describe('CubeConundrum', () => {
    let cubeConundrum: CubeConundrum;

    beforeEach(() => {
        cubeConundrum = new CubeConundrum();
    });

    test('1st possible game', () => {
        const data = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(1);
    });

    test('2st possible game', () => {
        const data = ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(2);
    });
    test('3rd possible game', () => {
        const data = ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(5);
    });

    test('all possible games', () => {
        const data = [
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ];

        expect(cubeConundrum.sumPossibleGames(data)).toEqual(8);
    });

    test('1st impossible game', () => {
        const data = ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(0);
    });

    test('2nd impossible game', () => {
        const data = ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(0);
    });

    test('all impossible games', () => {
        const data = [
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
        ];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(0);
    });

    test('all games', () => {
        const data = [
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ];

        expect(cubeConundrum.sumPossibleGames(data)).toEqual(8);
    });

    test('high game number', () => {
        const data = ['Game 333: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(333);
    });

    test('random line from the file', () => {
        const data = ['Game 80: 1 green, 13 blue, 2 red; 2 red, 1 green, 13 blue; 7 blue, 8 red'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(80);
    });


    test('random line from the file 2', () => {
        const data = ['Game 87: 4 red, 4 blue; 6 red, 2 blue; 5 blue, 3 green; 4 blue, 2 red\n'];
        expect(cubeConundrum.sumPossibleGames(data)).toEqual(87);
    });


    test('minimum cubes power for 1st', () => {
        const data = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'];
        expect(cubeConundrum.sumPowersOfMinimalCubeCounts(data)).toEqual(48);
    });

    test('minimum cuber power for 2nd', () => {
        const data = ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'];

        expect(cubeConundrum.sumPowersOfMinimalCubeCounts(data)).toEqual(630);
    });
});
