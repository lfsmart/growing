/**
 * 观察者模式
 * 1. 观察的对象，用于操作观察者，包括添加、删除、通知等操作
 * 2. 观察者，在被观察对象通知之后，响应
 */
namespace B24 {

  interface Sub {
    addObserver(username: Observer): void;
    removeObserve(username: Observer): void;
    clear(): void;
    notify(): void;
  }

  interface Obs {
    update(): void
  }

  // 主题
  class Subject implements Sub{

    // 储存观察者
    private observers: Observer[] = []
    addObserver(ob: Observer){
      const existed = this.observers.includes( ob );
      if( !existed ){
        this.observers.push( ob );
      }else{
        console.log( '已经添加过了', ob );
      }
    }

    // 删除观察者
    removeObserve(ob: Observer){
      const idx = this.observers.findIndex( item => item === ob );
      if( idx > -1){
        this.observers.splice(idx, 1);
      }
    }

    // 清空
    clear(){
      this.observers = []
    }

    // 通知所有的观察者
    notify(){
      this.observers.forEach( item => item.update() );
    }
  }

  // 观察者
  class Observer implements Obs{

    // 构造函数，自己的名称和需要添加的主题
    constructor(public name: string, subject?: Subject){
      this.name = name;
      if( subject ){
        subject.addObserver( this );
      }
    }
    update(){
      console.log( '下课' );
    }
  }

  // 创建实例
  const sub = new Subject();
  const observer1 = new Observer( 'lantian', sub );
  const observer2 = new Observer( 'lantian' );
  sub.addObserver( observer2 );
  sub.notify()
  // sub.addObserver();
}