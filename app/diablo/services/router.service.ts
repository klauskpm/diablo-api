interface RouteInterface {
  name: string,
  route: string
}

interface RouteParamInterface {
  name: string,
  value: any
}

var routes : Array<RouteInterface> = [
    {
      name: 'CareerProfile',
      route: '/profile/:battleTag/'
    },
    {
      name: 'Hero',
      route: '/profile/:battleTag/hero/:id'
    }
];

export class RouterService {
  public get(routeName: string, params : Array<Object>) : string {
    let tempRoute: string;
    
    routes.forEach((route) => {
      if (route.name == routeName) {
        tempRoute = route.route;
        
        params.forEach((param) => {
          let paramName : string;
          
          for (paramName in param) {
            
            if (param.hasOwnProperty(paramName))
              tempRoute = tempRoute.replace(':' + paramName, param[paramName]);
          }
        })
      }
    });
    
    return tempRoute;
  }
}