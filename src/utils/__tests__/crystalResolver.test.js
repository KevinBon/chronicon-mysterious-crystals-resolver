import { useStep, isSolved, resolve } from '../crystalResolver'
import { COLOR, STEP } from '../../constants';


describe('crystalResolver', () => {
    describe('useStep', () => {
        it('moves the grid with LEFT_ONE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.LEFT_ONE)).toEqual([
                [COLOR.BLUE, COLOR.BLUE, COLOR.RED],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with LEFT_TWO', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.LEFT_TWO)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.RED, COLOR.BLUE, COLOR.YELLOW],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with LEFT_THREE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.LEFT_THREE)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.YELLOW],
            ]);
        })
        it('moves the grid with RIGHT_ONE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.RIGHT_ONE)).toEqual([
                [COLOR.BLUE, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with RIGHT_TWO', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.RIGHT_TWO)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.BLUE, COLOR.YELLOW, COLOR.RED],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with RIGHT_THREE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.RIGHT_THREE)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.RED, COLOR.YELLOW, COLOR.YELLOW],
            ]);
        })
        // --
        it('moves the grid with TOP_ONE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.TOP_ONE)).toEqual([
                [COLOR.YELLOW, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.RED, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with TOP_TWO', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.TOP_TWO)).toEqual([
                [COLOR.RED, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
            ]);
        })
        it('moves the grid with TOP_THREE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.TOP_THREE)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.RED],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.BLUE],
            ]);
        })
        it('moves the grid with BOTTOM_ONE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.BOTTOM_ONE)).toEqual([
                [COLOR.YELLOW, COLOR.BLUE, COLOR.BLUE],
                [COLOR.RED, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ]);
        })
        it('moves the grid with BOTTOM_TWO', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.BOTTOM_TWO)).toEqual([
                [COLOR.RED, COLOR.YELLOW, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.RED],
            ]);
        })
        it('moves the grid with BOTTOM_THREE', () => {
            expect(useStep([
                [COLOR.RED, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.RED],
            ], STEP.BOTTOM_THREE)).toEqual([
                [COLOR.RED, COLOR.BLUE, COLOR.RED],
                [COLOR.YELLOW, COLOR.RED, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.BLUE],
            ]);
        })
    })
    describe('isSolved', () => {
        it('horizontally', () => {
            expect(isSolved([
                [COLOR.RED, COLOR.RED, COLOR.RED],
                [COLOR.BLUE, COLOR.BLUE, COLOR.BLUE],
                [COLOR.YELLOW, COLOR.YELLOW, COLOR.YELLOW],
            ])).toEqual(true);
        })
        it('vertically', () => {
            expect(isSolved([
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
            ])).toEqual(true);
        })
        it('not solved', () => {
            expect(isSolved([
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
                [COLOR.BLUE, COLOR.YELLOW, COLOR.RED],
                [COLOR.RED, COLOR.BLUE, COLOR.YELLOW],
            ])).toEqual(false);
        })
    })
    describe('resolve', () => {
        it('to be resolved', () => {
            const result = resolve([
                [COLOR.YELLOW, COLOR.BLUE, COLOR.RED],
                [COLOR.BLUE, COLOR.YELLOW, COLOR.RED],
                [COLOR.RED, COLOR.BLUE, COLOR.YELLOW]
            ])
            expect(result.state).toEqual('WIN');
        })
    })
});