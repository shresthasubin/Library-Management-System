import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import {Drawer} from 'expo-router/drawer';
export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen 
                name='(tabs)'
                options = {{
                    drawerLabel: 'Dashboard',
                    title: 'Dashboard'
                }}
            />
            <Drawer.Screen 
                name='login'
                options={{ drawerLabel: 'Login', headerShown: false}}
            />
            <Drawer.Screen 
                name='register'
                options={{ drawerLabel: 'Register', headerShown: false, drawerItemStyle: { display: 'none' }}}
            />
        </Drawer>
    )
}