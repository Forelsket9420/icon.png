// 家宽排序：先按指定国家顺序，再按国家里的序号从大到小
// 国家顺序：香港 美国 日本 新加坡 英国 德国 澳门 新西兰 泰国 澳大利亚 法国 韩国 加拿大 台湾 马来西亚 菲律宾 阿根廷 越南 巴林 捷克 厄瓜多尔 埃塞俄比亚 哈萨克 蒙古国 墨西哥 土耳其 乌拉圭
// 用法：Sub-Store 订阅编辑 > 操作 > 脚本操作 > 本地内容（粘贴本文件）
async function operator(proxies, targetPlatform, context) {
  const countryOrder = ['香港', '美国', '日本', '新加坡', '英国', '德国', '澳门', '新西兰', '泰国', '澳大利亚', '法国', '韩国', '加拿大', '台湾', '马来西亚', '菲律宾', '阿根廷', '越南', '巴林', '捷克', '厄瓜多尔', '埃塞俄比亚', '哈萨克', '蒙古国', '墨西哥', '土耳其', '乌拉圭'];
  const country = (name) => {
    const m = String(name).match(/([\u4e00-\u9fa5]+)\s*\d+\s*家宽/);
    return m ? m[1] : String(name);
  };
  const num = (name) => {
    const m = String(name).match(/(\d+)\s*家宽/);
    return m ? parseInt(m[1], 10) : -1;
  };
  const idx = (name) => {
    const i = countryOrder.indexOf(country(name));
    return i === -1 ? countryOrder.length : i;
  };
  return proxies
    .filter((p) => p.name.includes('家宽'))
    .sort((a, b) => {
      const d = idx(a.name) - idx(b.name);
      if (d !== 0) return d;
      return num(b.name) - num(a.name);
    });
}
