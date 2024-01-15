/**
 * 订阅者和发布者
 */
namespace B25 {

  type EventHandler = (...args: any[]) => any;
  type Subscriber = {
    [eventName: string]: EventHandler[];
  }

  interface Emiter{
    on(eventName: string, cb: EventHandler): void
    emit(eventName: string, data: any): void;
    remove(eventName: string): void;
    clear(): void;
  }

  // 订阅中心
  class EventEmiter implements Emiter {

    events: Subscriber = {};
    // 订阅
    on(eventName: string, cb: EventHandler): void{
      let subscriber = this.events[eventName];
      if( subscriber ){
        subscriber.push( cb );
      }else{
        subscriber = []
        subscriber.push( cb );
      }
      // console.log( this.events[eventName] );
      this.events[eventName] = subscriber;
      // this.events.findIndex();
      // let e = this.events.get( eventName );
      // if( !e ){
      //   this.events.set(eventName, e=[]);
      // }
      // e.push( cb );
    }

    // 发布
    emit(eventName: string, ...args: any[]): void{
      let subscriber = this.events[eventName];
      if( subscriber ){
        subscriber.forEach( cb => {
          cb( ...args )
        })
      }

      // let e = this.events.get( eventName );
      // if(e){
      //   e.forEach( cb => {
      //     cb( data );
      //   })
      // }
    }

    // 删除
    remove(eventName: string): void{
      let subscriber = this.events[eventName];
      if( subscriber ){
        delete this.events[eventName]
      }
      // let e = this.events.has( eventName );
      // if( e ){
      //   this.events.delete( eventName );
      // }
    }
    
    // 清空
    clear(){
      this.events = {};
    }
  }
  const event = new EventEmiter();

  // 订阅
  event.on( 'love', data => {
    console.log('订阅者1:', data);
  });
  event.on( 'love', data => {
    console.log('订阅者2:', data);
  });
  // 发布
  event.emit( 'love', '我是love, 更新章节了' );

  
  event.on( 'wuxia', data => {
    console.log('订阅者3:', data);
  });
  event.on( 'wuxia', data => {
    console.log('订阅者4:', data);
  });
  event.emit( 'wuxia', '我是wuxia, 擒龙功' );
  
  // 删除订阅者
  // event.remove('wuxia');
  event.emit( 'wuxia', '我是wuxia, 擒龙功2' );







  
}