import{K as ht,S as st,i as rt,s as ot,k as b,l as y,m as E,h as m,n as g,L as j,b as I,f as T,g as at,d as lt,t as O,M as pt,o as gt,a as w,c as k,G as h,N as G,O as ft,I as mt,q as W,r as R,B as X,P as ct,Q as dt,R as ut,w as Q,J as bt,x as Z,y as tt,z as et}from"../../../chunks/index-770eb6a8.js";import{c as A}from"../../../chunks/shared-23917130.js";import{B as yt}from"../../../chunks/border-87fa97d0.js";function D(n,{delay:t=0,duration:e=400,easing:s=ht}={}){const r=+getComputedStyle(n).opacity;return{delay:t,duration:e,easing:s,css:o=>`opacity: ${o*r}`}}function Ct(n,t){n.postMessage(JSON.stringify(t))}function vt(n){return n.data?JSON.parse(n.data):{}}function Pt(n){return n&&n.id&&n.radius&&n.position&&typeof n.position.x=="number"&&typeof n.position.y=="number"}function wt(n){return n&&typeof n.width=="number"&&typeof n.height=="number"}class kt{constructor(t={}){this.worker=new Worker(URL.createObjectURL(new Blob([`// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/lib/Vector.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class Vector {
	constructor ( x, y ) {
		if ( typeof x === 'object' ) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = y;
		}
	}

	cp () {
		return new Vector( this.x, this.y );
	}

	mul ( factor ) {
		this.x *= factor;
		this.y *= factor;
		return this;
	}

	normalize () {
		var l = this.length();
		this.x /= l;
		this.y /= l;
		return this;
	}

	length () {
		var length = Math.sqrt( this.x * this.x + this.y * this.y );
		
		if ( length < 0.005 && length > -0.005 ) {
			return 0.000001;
		}

		return length;
	}

	distance ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return Math.sqrt( ( deltaX * deltaX ) + ( deltaY * deltaY ) );
	}

	distanceSquared ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return ( deltaX * deltaX ) + ( deltaY * deltaY );
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircle.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircle {
	constructor ( { id, radius, x, y, isPulledToCenter, isPinned } ) {
		x = x || 0;
		y = y || 0;

		this.id = id;                      

		// Where we would like to be
		this.targetPosition = new Vector( 0, 0 );
		// Where we really are
		this.position = new Vector( x, y );
		this.previousPosition = new Vector( x, y );

		// For the div stuff  - to avoid superflous movement calls
	  	this.positionWithOffset = new Vector( x, y );
		this.previousPositionWithOffset = new Vector( x, y );

		this.isPulledToCenter = isPulledToCenter;
		this.isPinned = isPinned;

		// Stored because transform3D is relative
		this.setRadius( radius );
	}

	setPosition ( aPosition ) {
		this.previousPosition = this.position;
		this.position = aPosition.cp();
	}

	distanceSquaredFromTargetPosition () {
		var distanceSquared = this.position.distanceSquared( this.targetPosition );
		// if it's shorter than either radi, we intersect
		return distanceSquared < this.radiusSquared;
	}

	setRadius ( aRadius ) {
		this.radius = aRadius;
		this.radiusSquared = aRadius * aRadius;
		this.originalRadius = aRadius;
	}

	get delta () {
		return new Vector(
			this.position.x - this.previousPosition.x,
			this.position.y - this.previousPosition.y
		);
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircleManager.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircleManager {
	constructor () {
		this.allCircles = [ ];
		this.pinnedCircleIds = [ ];
		this.desiredTarget = new Vector( 0, 0 );
		this.bounds = { left: 0, top: 0, right: 0, bottom: 0 };
		this.damping = 0.025;

		// Number of passes for the centering and collision
		// algorithms - it's (O)logN^2 so use increase at your own risk!
		// Play with these numbers - see what works best for your project
		this.numberOfCenteringPasses = 1;
		this.numberOfCollisionPasses = 3;

		this.isCenterPullActive = true;
	}

	/**
	 * Set the boundary rectangle for the circle packing.
	 * This is used to locate the 'center'
	 * @param aBoundaryObject
	 */
	setBounds ( aBoundaryObject ) {
		if ( typeof aBoundaryObject.left === 'number' ) {
			this.bounds.left = aBoundaryObject.left;
		}

		if ( typeof aBoundaryObject.right === 'number' ) {
			this.bounds.right = aBoundaryObject.right;
		}

		if ( typeof aBoundaryObject.top === 'number' ) {
			this.bounds.top = aBoundaryObject.top;
		}

		if ( typeof aBoundaryObject.bottom === 'number' ) {
			this.bounds.bottom = aBoundaryObject.bottom;
		}

		if ( typeof aBoundaryObject.width === 'number' ) {
			this.bounds.right = this.bounds.left + aBoundaryObject.width;
		}

		if ( typeof aBoundaryObject.height === 'number' ) {
			this.bounds.bottom = this.bounds.top + aBoundaryObject.height;
		}
	}

	/**
	 * Add a circle
	 * @param aCircle A Circle to add, should already be created.
	 */
	addCircle ( aCircle ) {
		if ( ! ( aCircle instanceof PackedCircle ) ) {
			aCircle = new PackedCircle( {
				id: aCircle.id,
				radius: aCircle.radius,
				x: aCircle.position.x || 0,
				y: aCircle.position.y || 0,
				isPinned: aCircle.isPinned || false,
				isPulledToCenter: typeof aCircle.isPulledToCenter === 'boolean' ? aCircle.isPulledToCenter : true
			} );
		}

		this.allCircles.push( aCircle );
		aCircle.targetPosition = this.desiredTarget.cp();
	}

	/**
	 * Remove a circle
	 * @param circleToRemoveId Id of the circle to remove
	 */
	removeCircle ( circleToRemoveId ) {
		const indicesToRemove = this.allCircles.reduce( ( indices, circle, index ) => {
			if ( circle.id === circleToRemoveId ) {
				indices.push( index );
			}

			return indices;
		}, [ ] );

		for ( let n = indicesToRemove.length - 1; n >= 0; n-- ) {
			this.allCircles.splice( indicesToRemove[n], 1 );
		}
	}

	/**
	 * Recalculate all circle positions
	 */
	updatePositions () {
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			circle.previousPosition = circle.position.cp();
		}

		if ( this.desiredTarget && this.isCenterPullActive ) {
			// Push all the circles to the target - in my case the center of the bounds
			this.pushAllCirclesTowardTarget( this.desiredTarget );
		}
		
		// Make the circles collide and adjust positions to move away from each other
		this.handleCollisions();

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			this.handleBoundaryForCircle( circle );
		}
	}

	pushAllCirclesTowardTarget ( aTarget ) {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		for ( var n = 0; n < this.numberOfCenteringPasses; n++ ) {			
			for ( var i = 0; i < circleCount; i++ ) {
				var circle = circleList[i];
				
				if ( circle.isPulledToCenter ) {
					// Kinematic circles can't be pushed around.
					const isCircleKinematic = circle === dragCircle || this.isCirclePinned( circle.id );

					if ( isCircleKinematic ) {
						continue;
					}

					v.x = circle.position.x - aTarget.x;
					v.y = circle.position.y - aTarget.y;
					v.mul ( this.damping );
					
					circle.position.x -= v.x;
					circle.position.y -= v.y;
				}
			}
		}
	}

	/**
	 * Packs the circles towards the center of the bounds.
	 * Each circle will have it's own 'targetPosition' later on
	 */
	handleCollisions () {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// Collide circles
		for ( var n = 0; n < this.numberOfCollisionPasses; n++ ) {
			for ( var i = 0; i < circleCount; i++ ) {
				var circleA = circleList[i];
				
				for ( var j = i + 1; j < circleCount; j++ ) {
					var circleB = circleList[j];

					const isCircleAPinned = this.isCirclePinned( circleA.id );
					const isCircleBPinned = this.isCirclePinned( circleB.id );

					// Kinematic circles can't be pushed around.
					const isCircleAKinematic = circleA === dragCircle || isCircleAPinned;
					const isCircleBKinematic = circleB === dragCircle || isCircleBPinned;
					
					if (
						// It's us!
						circleA === circleB ||

						// Kinematic circles don't interact with eachother
						( isCircleAKinematic && isCircleBKinematic )
					) {
						continue; 
					}

					var dx = circleB.position.x - circleA.position.x;
					var dy = circleB.position.y - circleA.position.y;

					// The distance between the two circles radii, 
					// but we're also gonna pad it a tiny bit 
					var r = ( circleA.radius + circleB.radius ) * 1.08;
					var d = circleA.position.distanceSquared( circleB.position );

					if ( d < ( r * r ) - 0.02 ) {
						v.x = dx;
						v.y = dy;
						v.normalize();

						var inverseForce = ( r - Math.sqrt( d ) ) * 0.5;
						v.mul( inverseForce );
						
						if ( ! isCircleBKinematic ) {
							if ( isCircleAKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleB.position.x += v.x;
							circleB.position.y += v.y;
						}

						if ( ! isCircleAKinematic ) {
							if ( isCircleBKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleA.position.x -= v.x;
							circleA.position.y -= v.y;
						}
					}
				}
			}
		}
	}

	handleBoundaryForCircle ( aCircle ) {		
		const x = aCircle.position.x;
		const y = aCircle.position.y;
		const radius = aCircle.radius;
		
		let overEdge = false;

		if ( x + radius >= this.bounds.right ) {
			aCircle.position.x = this.bounds.right - radius;
			overEdge = true;
		} else if ( x - radius < this.bounds.left ) {
			aCircle.position.x = this.bounds.left + radius;
			overEdge = true;
		}

		if ( y + radius > this.bounds.bottom ) {
			aCircle.position.y = this.bounds.bottom - radius;
			overEdge = true;
		} else if ( y - radius < this.bounds.top ) {
			aCircle.position.y = this.bounds.top + radius;
			overEdge = true;
		}

		// end dragging if user dragged over edge
		if ( overEdge && aCircle === this.draggedCircle ) {
			this.draggedCircle = null;
		}
	}

	/**
	 * Force a certain circle to be the 'draggedCircle'.
	 * Can be used to undrag a circle by calling setDraggedCircle(null)
	 * @param aCircle  Circle to start dragging. It's assumed to be part of our list. No checks in place currently.
	 */
	setDraggedCircle ( aCircle ) {
		// Setting to null, and we had a circle before.
		// Restore the radius of the circle as it was previously
		if ( this.draggedCircle && this.draggedCircle !== aCircle ) {
			this.draggedCircle.radius = this.draggedCircle.originalRadius;
		}

		this.draggedCircle = aCircle;
	}

	dragStart ( id ) {
		const draggedCircle = this.allCircles.filter( circle => circle.id === id )[0];
		this.setDraggedCircle( draggedCircle );
	}

	dragEnd ( id ) {
		if ( this.draggedCircle ) {
			this.setDraggedCircle( null );
		}
	}

	drag ( id, position ) {
		if ( this.draggedCircle && position ) {
			this.draggedCircle.position.x = position.x;
			this.draggedCircle.position.y = position.y;
		}
	}

	isCirclePinned ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			return circle.isPinned;
		}

		return false;
	}

	pinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = true;
		}
	}

	unpinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = false;
		}
	}

	setCircleRadius ( id, radius ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.setRadius( radius );
		}
	}

	setCircleCenterPull ( id, centerPull ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPulledToCenter = centerPull;
		}
	}

	setCenterPull ( centerPull ) {
		this.isCenterPullActive = centerPull;
	}

	circleById ( id ) {
		return this.allCircles.filter( circle => circle.id === id )[0];
	}

	/**
	 * Sets the target position where the circles want to be
	 * @param aPosition
	 */
	setTarget ( aPosition ) {
		this.desiredTarget = aPosition;
	}
}

function sendWorkerMessage ( worker, msg ) {
	worker.postMessage( JSON.stringify( msg ) );
}

function processWorkerMessage ( event ) {
	return event.data ? JSON.parse( event.data ) : { };
}

// this code is mostly for message passing between the 
// PackedCircleManager and CirclePacker classes

self.addEventListener( 'message', receivedMessage );

const circleManager = new PackedCircleManager();

function receivedMessage ( event ) {
	const { type, message } = processWorkerMessage( event );

	if ( type === 'bounds' )  {
		circleManager.setBounds( message );
	}

	if ( type === 'target' )  {
		setTarget( message );
	}

	if ( type === 'addcircles' ) {
		addCircles( message );
	}

	if ( type === 'removecircle' ) {
		circleManager.removeCircle( message );
	}

	if ( type === 'update' ) {
		update();
	}

	if ( type === 'dragstart' ) {
		circleManager.dragStart( message.id, message.position );
	}

	if ( type === 'drag' ) {
		circleManager.drag( message.id, message.position );
	}

	if ( type === 'dragend' ) {
		circleManager.dragEnd( message.id );
	}

	if ( type === 'pincircle' ) {
		circleManager.pinCircle( message );
	}

	if ( type === 'unpincircle' ) {
		circleManager.unpinCircle( message );
	}

	if ( type === 'centeringpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCenteringPasses = message;
		}
	}

	if ( type === 'collisionpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCollisionPasses = message;
		}
	}

	if ( type === 'damping' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.damping = message;
		}
	}

	if ( type === 'circleradius' ) {
		circleManager.setCircleRadius( message.id, message.radius );
	}

	if ( type === 'circlecenterpull' ) {
		circleManager.setCircleCenterPull( message.id, message.centerPull );
	}

	if ( type === 'centerpull' ) {
		circleManager.setCenterPull( message.centerPull );
	}
}

function updatePage ( type, message ) {
	sendWorkerMessage( self, { type, message } );
}

function addCircles ( circles ) {
	if ( Array.isArray( circles ) && circles.length ) {
		circles.forEach( circleManager.addCircle.bind( circleManager ) );
	}
}

function setTarget ( target ) {
	if ( target && typeof target.x === 'number' && typeof target.y === 'number' ) {
		circleManager.setTarget( new Vector( target ) );
	}
}

function update () {
	circleManager.updatePositions();

	sendPositions();
}

function sendPositions () {
	const positions = circleManager.allCircles.reduce( ( result, circle ) => {
		result[circle.id] = {
			position: circle.position,
			previousPosition: circle.previousPosition,
			radius: circle.radius,
			delta: circle.delta,
			isPulledToCenter: circle.isPulledToCenter,
			isPinned: circle.isPinned
		};

		return result;
	}, { } );

	updatePage( 'move', positions );
}
`],{type:"text/javascript"}))),this.worker.addEventListener("message",this.receivedWorkerMessage.bind(this)),this.isContinuousModeActive=typeof t.continuousMode=="boolean"?t.continuousMode:!0,this.onMoveStart=t.onMoveStart||null,this.onMove=t.onMove||null,this.onMoveEnd=t.onMoveEnd||null,this.lastCirclePositions=[],t.centeringPasses&&this.setCenteringPasses(t.centeringPasses),t.collisionPasses&&this.setCollisionPasses(t.collisionPasses),this.addCircles(t.circles||[]),this.setBounds(t.bounds||{width:100,height:100}),this.setTarget(t.target||{x:50,y:50}),this.isLooping=!1,this.areItemsMoving=!0,this.animationFrameId=NaN,this.initialized=!0,this.isContinuousModeActive&&this.startLoop()}receivedWorkerMessage(t){const e=vt(t);if(e.type==="move"){const s=e.message;this.areItemsMoving=this.hasItemMoved(s),!this.areItemsMoving&&this.isLooping&&this.initialized&&this.isContinuousModeActive&&this.stopLoop()}this.updateListeners(e)}updateWorker(t,e){Ct(this.worker,{type:t,message:e})}updateListeners({type:t,message:e}){t==="movestart"&&typeof this.onMoveStart=="function"&&this.onMoveStart(e),t==="move"&&typeof this.onMove=="function"&&(this.lastCirclePositions=e,this.onMove(e)),t==="moveend"&&typeof this.onMoveEnd=="function"&&this.onMoveEnd(e)}addCircles(t){if(Array.isArray(t)&&t.length){const e=t.filter(Pt);e.length&&this.updateWorker("addcircles",e)}this.startLoop()}addCircle(t){this.addCircles([t])}removeCircle(t){t&&(t.id?this.updateWorker("removecircle",t.id):this.updateWorker("removecircle",t),this.startLoop())}pinCircle(t){t&&(t.id?this.updateWorker("pincircle",t.id):this.updateWorker("pincircle",t),this.startLoop())}unpinCircle(t){t&&(t.id?this.updateWorker("unpincircle",t.id):this.updateWorker("unpincircle",t),this.startLoop())}setCircleRadius(t,e){t&&e>=0&&(t.id?this.updateWorker("circleradius",{id:t.id,radius:e}):this.updateWorker("circleradius",{id:t,radius:e}),this.startLoop())}setCircleCenterPull(t,e){t&&(t.id?this.updateWorker("circlecenterpull",{id:t.id,centerPull:!!e}):this.updateWorker("circlecenterpull",{id:t,centerPull:!!e}),this.startLoop())}setCenterPull(t){this.updateWorker("centerpull",{centerPull:!!t}),this.startLoop()}setBounds(t){wt(t)&&(this.updateWorker("bounds",t),this.startLoop())}setTarget(t){this.updateWorker("target",t),this.startLoop()}setCenteringPasses(t){this.updateWorker("centeringpasses",t)}setCollisionPasses(t){this.updateWorker("collisionpasses",t)}setDamping(t){this.updateWorker("damping",t)}update(){this.updateWorker("update")}dragStart(t){this.updateWorker("dragstart",{id:t}),this.startLoop()}drag(t,e){this.updateWorker("drag",{id:t,position:e}),this.startLoop()}dragEnd(t){this.updateWorker("dragend",{id:t}),this.startLoop()}updateLoop(){this.update(),this.isLooping&&(this.areItemsMoving?this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)):this.stopLoop())}startLoop(){!this.isLooping&&this.initialized&&this.isContinuousModeActive&&(this.isLooping=!0,this.isContinuousModeActive&&(this.areItemsMoving=!0),this.updateListeners({type:"movestart"}),this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)))}stopLoop(){this.isLooping&&(this.isLooping=!1,this.updateListeners({type:"moveend",message:this.lastCirclePositions}),cancelAnimationFrame(this.animationFrameId))}hasItemMoved(t){let e=!1;for(let s in t)(Math.abs(t[s].delta.x)>.005||Math.abs(t[s].delta.y)>.005)&&(e=!0);return e}destroy(){this.worker&&this.worker.terminate(),this.stopLoop(),this.onMove=null,this.onMoveStart=null,this.onMoveEnd=null}}function nt(n,t,e){const s=n.slice();return s[10]=t[e],s[12]=e,s}function Mt(n){let t,e=n[10].name+"",s,r,o,i,a,l,d,C=n[10].desc+"",P,p,c,u,f,M,F=n[10].langs.join(", ")+"",_,z,N,L,J,$,B,H=n[10].url+"",Y,K,V,q;return{c(){t=b("span"),s=W(e),r=w(),o=b("br"),i=w(),a=b("br"),l=w(),d=b("small"),P=W(C),p=w(),c=b("br"),u=w(),f=b("br"),M=W(`
            Built with: `),_=W(F),z=w(),N=b("br"),L=w(),J=b("br"),$=w(),B=b("a"),Y=W(H),this.h()},l(S){t=y(S,"SPAN",{class:!0});var x=E(t);s=R(x,e),r=k(x),o=y(x,"BR",{}),i=k(x),a=y(x,"BR",{}),l=k(x),d=y(x,"SMALL",{class:!0});var v=E(d);P=R(v,C),p=k(v),c=y(v,"BR",{}),u=k(v),f=y(v,"BR",{}),M=R(v,`
            Built with: `),_=R(v,F),z=k(v),N=y(v,"BR",{}),L=k(v),J=y(v,"BR",{}),$=k(v),B=y(v,"A",{href:!0,class:!0});var U=E(B);Y=R(U,H),U.forEach(m),v.forEach(m),x.forEach(m),this.h()},h(){g(B,"href",n[10].url),g(B,"class","svelte-fozpmv"),g(d,"class","svelte-fozpmv"),g(t,"class","svelte-fozpmv")},m(S,x){I(S,t,x),h(t,s),h(t,r),h(t,o),h(t,i),h(t,a),h(t,l),h(t,d),h(d,P),h(d,p),h(d,c),h(d,u),h(d,f),h(d,M),h(d,_),h(d,z),h(d,N),h(d,L),h(d,J),h(d,$),h(d,B),h(B,Y),q=!0},p:X,i(S){q||(ct(()=>{V&&V.end(1),K=dt(t,D,{delay:300,duration:200}),K.start()}),q=!0)},o(S){K&&K.invalidate(),V=ut(t,D,{duration:100}),q=!1},d(S){S&&m(t),S&&V&&V.end()}}}function _t(n){let t,e=n[10].name+"",s,r,o,i;return{c(){t=b("span"),s=W(e),this.h()},l(a){t=y(a,"SPAN",{class:!0});var l=E(t);s=R(l,e),l.forEach(m),this.h()},h(){g(t,"class","svelte-fozpmv")},m(a,l){I(a,t,l),h(t,s),i=!0},p:X,i(a){i||(ct(()=>{o&&o.end(1),r=dt(t,D,{delay:300,duration:200}),r.start()}),i=!0)},o(a){r&&r.invalidate(),o=ut(t,D,{duration:100}),i=!1},d(a){a&&m(t),a&&o&&o.end()}}}function it(n){let t,e,s,r,o,i,a;const l=[_t,Mt],d=[];function C(p,c){return p[4][p[12]]?1:0}e=C(n),s=d[e]=l[e](n);function P(...p){return n[7](n[12],n[10],...p)}return{c(){t=b("div"),s.c(),r=w(),this.h()},l(p){t=y(p,"DIV",{class:!0});var c=E(t);s.l(c),r=k(c),c.forEach(m),this.h()},h(){g(t,"class","item svelte-fozpmv"),j(t,"active",n[4][n[12]]),j(t,"faded",n[5]>-1&&n[12]!==n[5])},m(p,c){I(p,t,c),d[e].m(t,null),h(t,r),o=!0,i||(a=[G(t,"click",P),G(t,"keydown",At)],i=!0)},p(p,c){n=p;let u=e;e=C(n),e===u?d[e].p(n,c):(at(),O(d[u],1,1,()=>{d[u]=null}),lt(),s=d[e],s?s.p(n,c):(s=d[e]=l[e](n),s.c()),T(s,1),s.m(t,r)),(!o||c&16)&&j(t,"active",n[4][n[12]]),(!o||c&32)&&j(t,"faded",n[5]>-1&&n[12]!==n[5])},i(p){o||(T(s),o=!0)},o(p){O(s),o=!1},d(p){p&&m(t),d[e].d(),i=!1,ft(a)}}}function xt(n){let t,e,s=n[6],r=[];for(let i=0;i<s.length;i+=1)r[i]=it(nt(n,s,i));const o=i=>O(r[i],1,1,()=>{r[i]=null});return{c(){t=b("div");for(let i=0;i<r.length;i+=1)r[i].c();this.h()},l(i){t=y(i,"DIV",{class:!0});var a=E(t);for(let l=0;l<r.length;l+=1)r[l].l(a);a.forEach(m),this.h()},h(){g(t,"class","container svelte-fozpmv"),j(t,"ready",n[3])},m(i,a){I(i,t,a);for(let l=0;l<r.length;l+=1)r[l].m(t,null);n[8](t),e=!0},p(i,[a]){if(a&119){s=i[6];let l;for(l=0;l<s.length;l+=1){const d=nt(i,s,l);r[l]?(r[l].p(d,a),T(r[l],1)):(r[l]=it(d),r[l].c(),T(r[l],1),r[l].m(t,null))}for(at(),l=s.length;l<r.length;l+=1)o(l);lt()}(!e||a&8)&&j(t,"ready",i[3])},i(i){if(!e){for(let a=0;a<s.length;a+=1)T(r[a]);e=!0}},o(i){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)O(r[a]);e=!1},d(i){i&&m(t),pt(r,i),n[8](null)}}}const At=n=>{n.key==="Enter"&&n.target.click()};function St(n,t,e){const s=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${A}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"Trulioo.com",img:`${A}/trulioo.png`,url:"https://www.trulioo.com",langs:["JavaScript","PHP"],desc:"Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${A}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"Y-Stem and Chess",img:`${A}/ysc.png`,url:"https://github.com/TritonSE/YSC-Mobile-Application",langs:["TypeScript","React Native"],desc:"A real-time chess mobile application, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."},{name:"FixNation Landing Page",img:`${A}/fix.png`,url:"https://landing.fixnation.org",langs:["JavaScript","Svelte"],desc:"A landing page for Los Angeles-based spay and neuter clinic FixNation."}],r=(c,u)=>Math.random()*(u-c)+c;let o,i,a,l=!1;gt(()=>{let c={width:o.offsetWidth,height:o.offsetHeight};e(2,a=s.map(()=>({id:Math.random().toString(),radius:50,position:{x:r(-10,10)+c.width/2,y:r(-10,10)+c.height/2}})));const u=f=>{requestAnimationFrame(()=>{if(!o)return;let M=0;for(let F in f){const _=f[F],z=_.position.x-_.radius,N=_.position.y-_.radius,L=o.children[M++];L.style.width=_.radius*2+"px",L.style.height=_.radius*2+"px",L.style.transform=`translateX(${z}px) translateY(${N}px)`}})};e(1,i=new kt({bounds:c,target:{x:c.width/2,y:c.height/2},circles:a,onMove:u,collisionPasses:3,centeringPasses:2})),window.addEventListener("resize",()=>{o&&(c={width:o.offsetWidth,height:o.offsetHeight},i.setBounds(c),i.setTarget({x:c.width/2,y:c.height/2}))}),e(3,l=!0)});let d=new Array(s.length).fill(!1),C=-1;const P=(c,u,f)=>{if(d[c]){f.target.classList.remove("active"),i.setCircleRadius(a[c],50),e(4,d[c]=!1,d),e(0,o.style.backgroundImage="none",o),e(5,C=-1);let M={width:o.offsetWidth,height:o.offsetHeight};i.setTarget({x:M.width/2,y:M.height/2})}else{f.target.classList.add("active"),i.setCircleRadius(a[c],150),e(4,d[c]=!0,d),e(0,o.style.backgroundImage=`url(${u.img})`,o),e(5,C=c);let M={width:o.offsetWidth,height:o.offsetHeight};i.setTarget({x:M.width/2,y:0})}};function p(c){mt[c?"unshift":"push"](()=>{o=c,e(0,o)})}return[o,i,a,l,d,C,s,P,p]}class Lt extends st{constructor(t){super(),rt(this,t,St,xt,ot,{})}}function Bt(n){let t,e,s,r,o,i,a,l,d,C,P,p,c;return C=new yt({}),p=new Lt({}),{c(){t=b("meta"),e=b("link"),s=b("link"),r=b("link"),o=b("link"),i=b("meta"),a=b("meta"),l=b("meta"),d=w(),Q(C.$$.fragment),P=w(),Q(p.$$.fragment),this.h()},l(u){const f=bt("svelte-1kj5t3e",document.head);t=y(f,"META",{charset:!0}),e=y(f,"LINK",{rel:!0,sizes:!0,href:!0}),s=y(f,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),r=y(f,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),o=y(f,"LINK",{rel:!0,href:!0}),i=y(f,"META",{name:!0,content:!0}),a=y(f,"META",{name:!0,content:!0}),l=y(f,"META",{name:!0,content:!0}),f.forEach(m),d=k(u),Z(C.$$.fragment,u),P=k(u),Z(p.$$.fragment,u),this.h()},h(){g(t,"charset","utf-8"),g(e,"rel","apple-touch-icon"),g(e,"sizes","180x180"),g(e,"href",A+"/apple-touch-icon.png"),g(s,"rel","icon"),g(s,"type","image/png"),g(s,"sizes","32x32"),g(s,"href",A+"/favicon-32x32.png"),g(r,"rel","icon"),g(r,"type","image/png"),g(r,"sizes","16x16"),g(r,"href",A+"/favicon-16x16.png"),g(o,"rel","manifest"),g(o,"href",A+"/site.webmanifest"),g(i,"name","viewport"),g(i,"content","width=device-width, initial-scale=1"),g(a,"name","apple-mobile-web-app-capable"),g(a,"content","yes"),g(l,"name","description"),g(l,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell - Projects"},m(u,f){h(document.head,t),h(document.head,e),h(document.head,s),h(document.head,r),h(document.head,o),h(document.head,i),h(document.head,a),h(document.head,l),I(u,d,f),tt(C,u,f),I(u,P,f),tt(p,u,f),c=!0},p:X,i(u){c||(T(C.$$.fragment,u),T(p.$$.fragment,u),c=!0)},o(u){O(C.$$.fragment,u),O(p.$$.fragment,u),c=!1},d(u){m(t),m(e),m(s),m(r),m(o),m(i),m(a),m(l),u&&m(d),et(C,u),u&&m(P),et(p,u)}}}class jt extends st{constructor(t){super(),rt(this,t,null,Bt,ot,{})}}export{jt as default};
