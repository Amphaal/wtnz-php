<header>
    <div class='fctr' id='logo'>
        <span>WTNZ</span>
    </div>
    <div id='banner'>
        <div id='banner-desc'>
            <span style='color : white'><?php echo $user_qs ?></span><span style='color : rgba(0, 0, 0, 0.65)'> Library</span>
        </div>
        <?php include 'front/ui/searchBand.php' ?>
        <div id='banner-side'>
            <label title="Feed">
                <input id='showFeed' type='checkbox' onclick="toggleFeed(event)" autocomplete="off">
                <i class="far fa-newspaper"></i>
            </label>
            <label title="Statistics">
                <input id='showStats' type='checkbox' onclick="toggleStats(event)" autocomplete="off">
                <i class="fas fa-chart-pie"></i>
            </label>   
        </div>
        <div class='anim'></div>
    </div>
</header>