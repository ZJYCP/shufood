import { $wuxButton } from '../../components/wux'

Page({
	data: {
		types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], 
		index: 3, 
		opened: !1, 
	},
	onLoad() {
		this.initButton()
	},
	initButton(position = 'bottomRight') {
		this.setData({
			opened: !1, 
		})

		this.button = $wuxButton.init('br', {
			position: position, 
			buttons: [
				{
					label: 'View on Github', 
					icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAOGSURBVGje7VhLSFVRFF1HLROtLHtmhVJmz0c/NUstoQ84KAuSauKkdJDQh2pghRAFkTQwiKIoMppFk0ALKioKggbmQEJCsAQjKIMc9Ochymqg73Pf3ed+n4PgreG+e6+1zn7nnbvPBVJI4X8Dq3iOA5Twhq1cPZ3S63mPTnCNoeSL1/OnI/EIBrgpeeKVHHElHkEPV/gXz+QVT+IRnKLyIx/kuC/5yR+jwKt8nW/xCMq8yO9NmjxJ1rqV351UeZKsciNfk3R5kiyWtIQ9ygKMeNw21pjAHPU3MZhmkk/Do4TQHzz3IBfGg4RIOq47af9BU+uOAADX8q7jZrdzEQAIFXV28vkCXWn0aYB34uIf+ZJd7OYrfomLXmRWNH+nwDbL2kCnUJJjyNjIowyKtRU8zVWGSLHAdsJKvlBs6EwPO0Dfz4QFGTdhq8gzw6sByO1u1PnN1mypIDxCe5jHLTu+A1s1PPs8d6BFE18p+32i8ZvvuQMhDeMFKXmmJnmz5/UD4H6RM0whtURM7fUjDzBds6y5kYzYHlgjMrT5M6AmcEh8sMxsoFJM9NkBAE/FaHRujhkoFxN/+TYgv1kFA6VC2mc/E+UUxsToUrMBaXQc968PitGA2YB0bOYlwUCaGM00Pw4LaTm+pvoEKQOiajEDX8XEbN8GAmJ01GzgvZgoDpKuIN8Jhs0G3oqJDb4NHBCjg6YI92gOzXQ/6pytYS03d6Bfw7Hd1/qbNPFhU0T7NkwYoVytf4mGcSx2OEQ7oMbwTMPTRU9DGXO1Xe0Q/93cpe1BHxe6lg9RD/nNq50JJ3HMeR84nx2WXGm6wqtxSWeFbyOddvMRFXfwIa3Roi+Pvxf0s5gZPC9SfBJqGzlKZ7Da1LxlSN0AsE2gaBfX/tiR/HHrFgYS0ucxg79NJOIbgkWODFjfDQE2G9JvAgwmUHRrKsEftvLb7Hew4mtDSR7A5fwQF2nW1tp9Sb1hKw8AXGAoOjkVzeUWVttUXraU/27b/ijROkOh47eBjYEipzwAWG8ovW+3dgcGKlzIAwAbtFRNHgzU6Gp0hyJUN3Tfc9zPiWWqx7UBQL1AyG2NgCEsVv36x5ZkahBZMP913MxIZxBUll8dbVajwuowqvHNk4E+hFS7onWSg3aqXpWP+tggbXFfit0t3qFWVapBJBMs422SQ7G7vSmjkGGSl1iSVOEUUphe/AMv8ctn/pO1zAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0wNFQxMDo0MDo0MiswODowMNlOhSIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMDRUMTA6NDA6NDIrMDg6MDCoEz2eAAAAAElFTkSuQmCC", 
				},
				{
					label: 'View on About', 
					icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAM3SURBVGje7VlNSBRRHP8/tU1dd7PNwkwiUqFIb5pGlJZEardIsOwi5iU6SF+XDhVBRFFJdKlbH0hdgkBIO3kptSKiEgKJWAikQrKgxLD9dZB982b2zex7b2ZZof2f/sv+vuYx8z5mGBkVYtRGzdRI1RSmWfpAYzRKI2zeTE3POorTcKtZ9KAgk+YRXEP6OoH8zNgfUDBPVnPQ5kUY1LAHgEvIC86+HDMO+UkcQpEt4EG8dWAmEAnGvtIh/Bg1LsgqPLIhZ7DSv32pw357Gvw2GzqOQn/2DKO2ay9R4JRgSODc8xegS5C6CPXYVwXeHnP7kCBzXYtJuM2ZC8bPA1q5yGfdGQ4hzHN2vTvOO1s37/azBb0A7A91WGzTEfjCr8FgckUhZ78ysycu8NuIzzh/2h0V3HRpWLkAuQC5ALkASzkAI0oeNIpUdwIu9ct0BKZ4Z3LcCPEubhrAWsVWGAQo5d070wDPebfJIIC1d35tGuAl7zpIv1p598aATUSEMF/R/+rfhvjG2Qp7aTeR91xkgyZzjXU28MKlmwesvfBhzeztvBswvn4irBU25iENHsN3ztvoIwARJrlQtwaribPmfE5iaBfGIKrIyUOcc3r8+RMKhAB3FDl9AifsMwAROgS5Ywr4RgF/1Lc9Ech2Qj6VBt0kYOewLIAAtmcaAPo9kLttyNpA7ImIUG8TdlmabKdpoDMweyIi7BCkm1wwmwVMr5qu4o4IMWoRfrpNScuFPiG+xPJ37eW4DHtVuiBXOXD9qjOHu/l63IKzRjzwD1PQZ1Fmal6DB0itYa/FFWE8k3AGUKFrXodhqXmdAncXPkm4dxUXJRAaMCERGES1cnzCVryQaAxhizeRYSemJMSbbredp1otnki0xtEgXR+Rj7aUN8IAcAGr9c25ahXuSzQ/ogXMPmRHIKuTMNmOO0Osww2J9k/sTQIiGJcA+lDs35yHKMN5iUccFYQSfE35o0tn+6UcIorjqRnIMTw/sC9DH1wWQxSj1xnAqjk0226NTIUIoRPTsgD+Py6oh4glTRmSD2WCZXDoUwIwSix2S/kFxX8SwLoHsjYCY9kOcC7LAdhTupJF/zP/AOvS/D0NTmDBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjQ3OjQ1KzA4OjAwI6N5UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTo0Nzo0NSswODowMFL+wewAAAAASUVORK5CYII=", 
				}
			],
			buttonClicked(index, item) {
				index === 0 && wx.showModal({
					title: 'Thank you for your support!', 
					showCancel: !1, 
				})

				index === 1 && wx.switchTab({
					url: '/pages/about/index'
				})

				return true
			},
			callback(vm, opened) {
				vm.setData({
					opened, 
				})
			},
		})
	},
	// switchChange(e) {
	// 	e.detail.value ? this.button.open() : this.button.close()
	// },
	// pickerChange(e) {
	// 	const index = e.detail.value
	// 	const position = this.data.types[index]
	// 	this.initButton(position)
	// },
})