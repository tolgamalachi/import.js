"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require('chai');
const CSVDataSource_1 = require("../src/CSVDataSource");
const ImportPayload_1 = require("../src/ImportPayload");
class CSVCols extends ImportPayload_1.ImportPayload {
}
__decorate([
    CSVDataSource_1.CSVDataSource.indexColumn({ index: 0 })
], CSVCols.prototype, "spalte_a", void 0);
__decorate([
    CSVDataSource_1.CSVDataSource.indexColumn({ index: 1 })
], CSVCols.prototype, "spalte_b", void 0);
__decorate([
    CSVDataSource_1.CSVDataSource.indexColumn({ index: 2 })
], CSVCols.prototype, "spalte_c", void 0);
class CSVHeadlineCols extends ImportPayload_1.ImportPayload {
}
__decorate([
    CSVDataSource_1.CSVDataSource.regexColumn({ regex: /COLA/ })
], CSVHeadlineCols.prototype, "spalte_a", void 0);
__decorate([
    CSVDataSource_1.CSVDataSource.regexColumn({ regex: /COLB/ })
], CSVHeadlineCols.prototype, "spalte_b", void 0);
__decorate([
    CSVDataSource_1.CSVDataSource.regexColumn({ regex: /COLC/ })
], CSVHeadlineCols.prototype, "spalte_c", void 0);
let CSVDataSourceTest = class CSVDataSourceTest {
    test_annotations() {
        class CSVColsTest extends ImportPayload_1.ImportPayload {
        }
        __decorate([
            CSVDataSource_1.CSVDataSource.indexColumn({ index: 0 })
        ], CSVColsTest.prototype, "spalte_a", void 0);
        __decorate([
            CSVDataSource_1.CSVDataSource.indexColumn({ index: 1 })
        ], CSVColsTest.prototype, "spalte_b", void 0);
        __decorate([
            CSVDataSource_1.CSVDataSource.indexColumn({ index: 2 })
        ], CSVColsTest.prototype, "spalte_c", void 0);
        let x = new CSVColsTest();
        chai_1.expect(CSVColsTest.getFields().spalte_c.index).to.equal(2);
        chai_1.expect(CSVColsTest.getFields().spalte_b.index).to.equal(1);
        chai_1.expect(CSVColsTest.getFields().spalte_a.index).to.equal(0);
    }
    parse_test_csv_file() {
        let importer = new CSVDataSource_1.CSVDataSource(CSVCols);
        importer.open("tests/CSVImporterTest.csv");
        // payload mockup:
        // { spalte_a: 1, spalte_b: 2, spalte_c: 3}
        // { spalte_a: a, spalte_b: b, spalte_c: c}
    }
    parse_demo_csv() {
        try {
            let importer = new CSVDataSource_1.CSVDataSource(CSVCols);
            importer.open("../../tests/nonexistingfoo.csv");
        }
        catch (e) {
            if (e instanceof Error) {
                chai_1.expect(e.message).to.equal("File not found: ../../tests/nonexistingfoo.csv");
            }
        }
    }
    parse_test_csv_file_rows() {
        let importer = new CSVDataSource_1.CSVDataSource(CSVCols);
        importer.open("tests/CSVImporterTest.csv");
        let gen = importer.generatePayload();
        let first_row = (gen.next().value);
        let second_row = (gen.next().value);
        chai_1.expect(first_row.spalte_a).to.equal("1");
        chai_1.expect(first_row.spalte_b).to.equal("2");
        chai_1.expect(first_row.spalte_c).to.equal("3");
        chai_1.expect(second_row.spalte_a).to.equal("a");
        chai_1.expect(second_row.spalte_b).to.equal("b");
        chai_1.expect(second_row.spalte_c).to.equal("c");
    }
    parse_test_csv_file_rows_high_index() {
        class CSVColsXXL extends ImportPayload_1.ImportPayload {
        }
        __decorate([
            CSVDataSource_1.CSVDataSource.indexColumn({ index: 100 })
        ], CSVColsXXL.prototype, "spalte_a", void 0);
        try {
            let importer = new CSVDataSource_1.CSVDataSource(CSVColsXXL);
            importer.open("tests/CSVImporterTest.csv");
            let gen = importer.generatePayload();
            gen.next();
        }
        catch (e) {
            if (e instanceof Error) {
                chai_1.expect(e.message).to.equal("Not enough columns in the File: tests/CSVImporterTest.csv");
            }
        }
    }
    parse_test_escapes() {
        let importer = new CSVDataSource_1.CSVDataSource(CSVCols);
        importer.open("tests/CSVImporterTestMean.csv");
        let gen = importer.generatePayload();
        var val = gen.next().value;
        chai_1.expect(val.spalte_c).to.equal("c;d");
    }
    parse_test_headlines() {
        let importer = new CSVDataSource_1.CSVDataSource(CSVHeadlineCols);
        importer.open("tests/CSVImporterTestHeadline.csv", { delimiter: ";", hasHeadline: true });
        let gen = importer.generatePayload();
        var val = gen.next().value;
        chai_1.expect(importer.fields.spalte_a.index).to.equal(0);
        chai_1.expect(importer.fields.spalte_b.index).to.equal(1);
        chai_1.expect(importer.fields.spalte_c.index).to.equal(2);
    }
    parse_test_headlines_data() {
        let importer = new CSVDataSource_1.CSVDataSource(CSVHeadlineCols);
        importer.open("tests/CSVImporterTestHeadline.csv", { delimiter: ";", hasHeadline: true });
        let gen = importer.generatePayload();
        var val = gen.next().value;
        chai_1.expect(val.spalte_a).to.equal("1");
    }
};
__decorate([
    mocha_typescript_1.test("should know about its fields")
], CSVDataSourceTest.prototype, "test_annotations", null);
__decorate([
    mocha_typescript_1.test("should parse the test csv file")
], CSVDataSourceTest.prototype, "parse_test_csv_file", null);
__decorate([
    mocha_typescript_1.test("should throw an exception if it cant find the file")
], CSVDataSourceTest.prototype, "parse_demo_csv", null);
__decorate([
    mocha_typescript_1.test("should parse the test csv file according to a col definition")
], CSVDataSourceTest.prototype, "parse_test_csv_file_rows", null);
__decorate([
    mocha_typescript_1.test("should throw an error because the col definition accesses an index that does not exist in the CSV File")
], CSVDataSourceTest.prototype, "parse_test_csv_file_rows_high_index", null);
__decorate([
    mocha_typescript_1.test("should honor value escapes in csv files")
], CSVDataSourceTest.prototype, "parse_test_escapes", null);
__decorate([
    mocha_typescript_1.test("should identify the index of the headlines")
], CSVDataSourceTest.prototype, "parse_test_headlines", null);
__decorate([
    mocha_typescript_1.test("should return the correct values when searching for headlines")
], CSVDataSourceTest.prototype, "parse_test_headlines_data", null);
CSVDataSourceTest = __decorate([
    mocha_typescript_1.suite("A CSVDataSource")
], CSVDataSourceTest);
//# sourceMappingURL=CSVDataSourceTest.js.map