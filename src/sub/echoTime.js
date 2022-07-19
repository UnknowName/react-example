import {makeAutoObservable} from "mobx";
import {observer} from 'mobx-react-lite'


// 1. MobX 管理的Store单独一个类，这个类就是用来保存应用数据的。数据存储最好是类，不然一堆报错
// 2. 在调用组件时，将此参数传入
// 3. 页面展示逻辑与数据逻辑会开。组件为组件，数据为数据
// 4. Mobx只参与数据存储的那个类
class EchoTimeStore {
    now = 0;

    constructor() {
       makeAutoObservable(this)
    }

    add = () => {
        this.now++
    }

    get double() {
        return this.now * 2
    }
}

const store = new EchoTimeStore();

const EchoTime = () => {
    console.log("store is ",store.now);
    return (
        <div>
            now {store.now}<hr/>Double {store.double}
            <button onClick={store.add}>+</button>
        </div>
    )
}

// 视图的数据存储，要保存的数据放在类的内部
export default observer(EchoTime);
