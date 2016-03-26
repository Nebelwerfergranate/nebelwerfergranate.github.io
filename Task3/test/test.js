"use strict";

describe("Minesweeper methods testing", function() {
    var modelStateTester = new CheckModelStateTest();
    it("checkModelState testing", function(){
        modelStateTester.run();
    });
    
    var getCellXYTester = new GetSellXYTest();
    it("getCellXY testing", function(){
        getCellXYTester.run();
    });
    
    var getNeighborCellsCoordsTester = new GetNeighborCellsCoordsTest();
    it("getNeighborCellsCoordsTest testing", function(){
        getNeighborCellsCoordsTester.run();
    });
});