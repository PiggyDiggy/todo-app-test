import { cx } from ".";

describe("cx", () => {
  it("верно собирает строки", () => {
    const classname = cx("class1", "class2");
    expect(classname).toBe("class1 class2");
  });
  it("пропускает undefined", () => {
    const classname = cx(undefined, "class1");
    expect(classname).toBe("class1");
  });
  it("собирает класснейм по свойствам объектам", () => {
    const classname = cx({ class1: true, class2: false, class3: null });
    expect(classname).toBe("class1");
  });
  it("возвращает undefined, если не подошел ни один из аргументов", () => {
    const classname = cx(undefined, { class1: false });
    expect(classname).toBeUndefined();
  });
});
